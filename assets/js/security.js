/*===== セキュリティライブラリ =====*/

/**
 * セキュリティユーティリティクラス
 * XSS、CSRF、その他のセキュリティ脅威から保護
 */
class SecurityUtils {
    
    /**
     * CSRF トークン生成・管理
     */
    static generateCSRFToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * セッションストレージにCSRFトークンを保存
     */
    static setCSRFToken() {
        const token = this.generateCSRFToken();
        sessionStorage.setItem('csrf_token', token);
        return token;
    }

    /**
     * CSRFトークンの検証
     */
    static validateCSRFToken(token) {
        const storedToken = sessionStorage.getItem('csrf_token');
        return storedToken && storedToken === token;
    }

    /**
     * HTML エスケープ処理（XSS対策）
     */
    static escapeHTML(str) {
        if (typeof str !== 'string') return '';
        
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * より厳密なHTMLサニタイゼーション
     */
    static sanitizeHTML(str) {
        if (typeof str !== 'string') return '';
        
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    /**
     * URL検証（オープンリダイレクト対策）
     */
    static isValidURL(url) {
        try {
            const urlObj = new URL(url);
            // 許可されたプロトコルのみ
            const allowedProtocols = ['http:', 'https:', 'mailto:'];
            return allowedProtocols.includes(urlObj.protocol);
        } catch (e) {
            return false;
        }
    }

    /**
     * 外部URLの安全な開き方
     */
    static openSafeURL(url) {
        if (!this.isValidURL(url)) {
            console.warn('Invalid URL detected:', url);
            return false;
        }
        
        const newWindow = window.open();
        newWindow.opener = null;
        newWindow.location = url;
        return true;
    }

    /**
     * 入力値の検証とサニタイゼーション
     */
    static validateInput(input, type = 'text') {
        if (!input || typeof input !== 'string') return '';
        
        // 基本的なトリミング
        input = input.trim();
        
        switch (type) {
            case 'email':
                return this.validateEmail(input);
            case 'name':
                return this.validateName(input);
            case 'message':
                return this.validateMessage(input);
            default:
                return this.sanitizeHTML(input);
        }
    }

    /**
     * メールアドレス検証
     */
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return '';
        
        // HTMLエスケープ
        return this.sanitizeHTML(email);
    }

    /**
     * 名前フィールド検証
     */
    static validateName(name) {
        // 特殊文字を除去（アルファベット、ひらがな、カタカナ、漢字、スペースのみ許可）
        const cleanName = name.replace(/[^a-zA-Zあ-んア-ン一-龯\s]/g, '');
        
        if (cleanName.length < 1 || cleanName.length > 50) return '';
        
        return this.sanitizeHTML(cleanName);
    }

    /**
     * メッセージフィールド検証
     */
    static validateMessage(message) {
        // 危険なタグやスクリプトを除去
        const cleanMessage = message
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
        
        if (cleanMessage.length < 1 || cleanMessage.length > 1000) return '';
        
        return this.sanitizeHTML(cleanMessage);
    }

    /**
     * リファラーチェック（CSRF対策）
     */
    static validateReferrer() {
        const referrer = document.referrer;
        const currentOrigin = window.location.origin;
        
        // 同一オリジンまたは空のリファラーのみ許可
        if (!referrer || referrer.startsWith(currentOrigin)) {
            return true;
        }
        
        console.warn('Invalid referrer detected:', referrer);
        return false;
    }

    /**
     * DOM操作の安全化
     */
    static safeSetInnerHTML(element, content) {
        if (!element || !content) return;
        
        // コンテンツをサニタイズしてから設定
        element.textContent = content;
    }

    /**
     * 安全な属性設定
     */
    static safeSetAttribute(element, attribute, value) {
        if (!element || !attribute || value === null || value === undefined) return;
        
        // 危険な属性をブロック
        const dangerousAttributes = ['onclick', 'onload', 'onerror', 'onmouseover'];
        if (dangerousAttributes.includes(attribute.toLowerCase())) {
            console.warn('Dangerous attribute blocked:', attribute);
            return;
        }
        
        element.setAttribute(attribute, this.sanitizeHTML(String(value)));
    }

    /**
     * セキュリティ監査ログ
     */
    static logSecurityEvent(event, details = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event: event,
            details: details,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.warn('Security Event:', logEntry);
        
        // 本番環境では外部ログサービスに送信
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            // TODO: セキュリティログサービスに送信
        }
    }

    /**
     * セキュリティポリシー違反の検出
     */
    static initCSPReporting() {
        document.addEventListener('securitypolicyviolation', (e) => {
            this.logSecurityEvent('CSP_VIOLATION', {
                violatedDirective: e.violatedDirective,
                blockedURI: e.blockedURI,
                lineNumber: e.lineNumber,
                columnNumber: e.columnNumber
            });
        });
    }

    /**
     * セキュリティ初期化
     */
    static init() {
        // CSRFトークン設定
        this.setCSRFToken();
        
        // CSPレポート初期化
        this.initCSPReporting();
        
        // セキュリティヘッダー確認
        this.checkSecurityHeaders();
        
        console.log('Security utilities initialized');
    }

    /**
     * セキュリティヘッダーの確認
     */
    static checkSecurityHeaders() {
        // メタタグで設定されたセキュリティヘッダーの確認
        const requiredHeaders = [
            'Content-Security-Policy',
            'X-Frame-Options',
            'X-XSS-Protection',
            'X-Content-Type-Options'
        ];
        
        requiredHeaders.forEach(header => {
            const metaTag = document.querySelector(`meta[http-equiv="${header}"]`);
            if (!metaTag) {
                console.warn(`Missing security header: ${header}`);
            }
        });
    }
}

/**
 * セキュアなフォーム処理クラス
 */
class SecureFormHandler {
    
    constructor(formElement) {
        this.form = formElement;
        this.csrfToken = SecurityUtils.generateCSRFToken();
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        // CSRFトークンをフォームに追加
        this.addCSRFToken();
        
        // フォーム送信時の検証
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // リアルタイム入力検証
        this.addInputValidation();
    }
    
    addCSRFToken() {
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'csrf_token';
        tokenInput.value = this.csrfToken;
        this.form.appendChild(tokenInput);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // リファラーチェック
        if (!SecurityUtils.validateReferrer()) {
            SecurityUtils.logSecurityEvent('INVALID_REFERRER', {
                form: this.form.id || this.form.name
            });
            this.showError('セキュリティエラーが発生しました。');
            return false;
        }
        
        // CSRFトークン検証
        const submittedToken = this.form.querySelector('input[name="csrf_token"]')?.value;
        if (!SecurityUtils.validateCSRFToken(submittedToken)) {
            SecurityUtils.logSecurityEvent('CSRF_TOKEN_MISMATCH', {
                form: this.form.id || this.form.name
            });
            this.showError('セキュリティトークンが無効です。');
            return false;
        }
        
        // 入力値検証
        if (!this.validateAllInputs()) {
            return false;
        }
        
        // フォーム送信処理
        this.processForm();
        
        return true;
    }
    
    validateAllInputs() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.type === 'hidden') return;
            
            const value = input.value;
            const type = input.type === 'email' ? 'email' : 
                        input.name === 'name' ? 'name' : 
                        input.tagName.toLowerCase() === 'textarea' ? 'message' : 'text';
            
            const cleanValue = SecurityUtils.validateInput(value, type);
            
            if (input.required && !cleanValue) {
                this.showFieldError(input, '必須項目です。');
                isValid = false;
            } else if (value !== cleanValue) {
                this.showFieldError(input, '入力内容に問題があります。');
                isValid = false;
            } else {
                this.clearFieldError(input);
                input.value = cleanValue; // サニタイズされた値を設定
            }
        });
        
        return isValid;
    }
    
    addInputValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'hidden') return;
            
            // リアルタイム検証
            input.addEventListener('blur', () => {
                const value = input.value;
                const type = input.type === 'email' ? 'email' : 
                            input.name === 'name' ? 'name' : 
                            input.tagName.toLowerCase() === 'textarea' ? 'message' : 'text';
                
                const cleanValue = SecurityUtils.validateInput(value, type);
                
                if (value && value !== cleanValue) {
                    this.showFieldError(input, '入力内容に問題があります。');
                } else {
                    this.clearFieldError(input);
                }
            });
            
            // ペースト時の検証
            input.addEventListener('paste', (e) => {
                setTimeout(() => {
                    const event = new Event('blur');
                    input.dispatchEvent(event);
                }, 100);
            });
        });
    }
    
    showFieldError(input, message) {
        this.clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc2626';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        input.style.borderColor = '#dc2626';
        input.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }
    
    showError(message) {
        alert(message); // 本番では適切なUIで表示
    }
    
    processForm() {
        // フォーム送信成功
        alert('メッセージが送信されました。（セキュリティ検証済み）');
        
        // フォームリセット
        this.form.reset();
        
        // 新しいCSRFトークン生成
        this.csrfToken = SecurityUtils.generateCSRFToken();
        SecurityUtils.setCSRFToken();
        
        const tokenInput = this.form.querySelector('input[name="csrf_token"]');
        if (tokenInput) {
            tokenInput.value = this.csrfToken;
        }
    }
}

/**
 * SQL Injection対策（フロントエンド向け）
 * PDFで学んだ安全なSQL処理の原則をフロントエンドに適用
 */
class SQLSafetyUtils {
    
    /**
     * SQL関連の危険な文字列をチェック
     * フロントエンドでの予防的検証
     */
    static checkForSQLPatterns(input) {
        if (typeof input !== 'string') return false;
        
        const dangerousPatterns = [
            /(\bSELECT\b)|(\bINSERT\b)|(\bUPDATE\b)|(\bDELETE\b)|(\bDROP\b)/i,
            /(\bUNION\b)|(\bJOIN\b)|(\bWHERE\b)|(\bAND\b)|(\bOR\b)/i,
            /(')|(\-\-)|(\;)|(\bEXEC\b)|(\bEXECUTE\b)/i,
            /(\bxp_)|(\bsp_)|(\bEVAL\b)|(\bCAST\b)/i,
            /(\bCONCAT\b)|(\bSUBSTRING\b)|(\bCHAR\b)/i
        ];
        
        return dangerousPatterns.some(pattern => pattern.test(input));
    }
    
    /**
     * データベース関連の入力値サニタイゼーション
     */
    static sanitizeForDatabase(input) {
        if (typeof input !== 'string') return '';
        
        // SQL注入攻撃で使用される文字を無害化
        return input
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
            .replace(/;/g, '&#59;')
            .replace(/--/g, '&#45;&#45;')
            .replace(/\/\*/g, '&#47;&#42;')
            .replace(/\*\//g, '&#42;&#47;');
    }
    
    /**
     * 安全なパラメータ化クエリのシミュレーション（フロントエンド）
     */
    static prepareStatement(template, params) {
        if (!Array.isArray(params)) return template;
        
        let query = template;
        params.forEach((param, index) => {
            const placeholder = `$${index + 1}`;
            const sanitizedParam = this.sanitizeForDatabase(String(param));
            query = query.replace(placeholder, sanitizedParam);
        });
        
        return query;
    }
}

/**
 * ファイルアップロードセキュリティ
 */
class FileSecurityUtils {
    
    /**
     * 許可されたファイル拡張子
     */
    static ALLOWED_EXTENSIONS = [
        'jpg', 'jpeg', 'png', 'gif', 'webp', // 画像
        'pdf', 'doc', 'docx', 'txt', // ドキュメント
        'zip', 'rar' // アーカイブ
    ];
    
    /**
     * 許可されたMIMEタイプ
     */
    static ALLOWED_MIME_TYPES = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'text/plain',
        'application/zip', 'application/x-rar-compressed'
    ];
    
    /**
     * ファイルの安全性チェック
     */
    static validateFile(file) {
        const errors = [];
        
        // ファイルサイズチェック（5MB制限）
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            errors.push('ファイルサイズが大きすぎます（最大5MB）');
        }
        
        // 拡張子チェック
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!extension || !this.ALLOWED_EXTENSIONS.includes(extension)) {
            errors.push('許可されていないファイル形式です');
        }
        
        // MIMEタイプチェック
        if (!this.ALLOWED_MIME_TYPES.includes(file.type)) {
            errors.push('無効なファイルタイプです');
        }
        
        // ファイル名の安全性チェック
        if (this.containsDangerousChars(file.name)) {
            errors.push('ファイル名に危険な文字が含まれています');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    /**
     * ファイル名の危険な文字チェック
     */
    static containsDangerousChars(filename) {
        const dangerousChars = /[<>:"|?*\x00-\x1F]/;
        const dangerousNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i;
        
        return dangerousChars.test(filename) || dangerousNames.test(filename);
    }
    
    /**
     * 安全なファイル名生成
     */
    static generateSafeFilename(originalName) {
        const extension = originalName.split('.').pop()?.toLowerCase();
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        
        return `file_${timestamp}_${randomStr}.${extension}`;
    }
}

/**
 * セッションセキュリティ
 */
class SessionSecurity {
    
    /**
     * セッションタイムアウト管理
     */
    static SESSION_TIMEOUT = 30 * 60 * 1000; // 30分
    
    /**
     * セッション開始
     */
    static startSession() {
        const sessionId = SecurityUtils.generateCSRFToken();
        const timestamp = Date.now();
        
        sessionStorage.setItem('session_id', sessionId);
        sessionStorage.setItem('session_start', timestamp.toString());
        
        this.scheduleTimeoutCheck();
        return sessionId;
    }
    
    /**
     * セッション有効性チェック
     */
    static isSessionValid() {
        const sessionStart = sessionStorage.getItem('session_start');
        if (!sessionStart) return false;
        
        const startTime = parseInt(sessionStart);
        const currentTime = Date.now();
        
        return (currentTime - startTime) < this.SESSION_TIMEOUT;
    }
    
    /**
     * セッション更新
     */
    static refreshSession() {
        if (this.isSessionValid()) {
            sessionStorage.setItem('session_start', Date.now().toString());
        } else {
            this.endSession();
        }
    }
    
    /**
     * セッション終了
     */
    static endSession() {
        sessionStorage.removeItem('session_id');
        sessionStorage.removeItem('session_start');
        sessionStorage.removeItem('csrf_token');
        
        // ユーザーに通知
        console.log('セッションが期限切れになりました');
    }
    
    /**
     * 定期的なタイムアウトチェック
     */
    static scheduleTimeoutCheck() {
        setInterval(() => {
            if (!this.isSessionValid()) {
                this.endSession();
            }
        }, 60000); // 1分毎にチェック
    }
}

/**
 * セキュリティ監査ログ
 */
class SecurityAudit {
    
    /**
     * セキュリティイベントの種類
     */
    static EVENT_TYPES = {
        XSS_ATTEMPT: 'xss_attempt',
        CSRF_VIOLATION: 'csrf_violation',
        INVALID_INPUT: 'invalid_input',
        SESSION_TIMEOUT: 'session_timeout',
        FILE_UPLOAD_VIOLATION: 'file_upload_violation',
        SQL_INJECTION_ATTEMPT: 'sql_injection_attempt'
    };
    
    /**
     * セキュリティイベントログ
     */
    static logSecurityEvent(eventType, details = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            type: eventType,
            userAgent: navigator.userAgent,
            url: window.location.href,
            details: details,
            sessionId: sessionStorage.getItem('session_id')
        };
        
        // 開発環境ではコンソールに出力
        if (window.location.hostname === 'localhost') {
            console.warn('Security Event:', logEntry);
        }
        
        // 本番環境では適切なログサービスに送信
        this.sendToSecurityService(logEntry);
    }
    
    /**
     * セキュリティサービスへの送信
     */
    static sendToSecurityService(logEntry) {
        // 本番環境では実際のセキュリティサービスAPIに送信
        // GitHub Pages環境では制限があるため、ローカルストレージに保存
        try {
            const existingLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
            existingLogs.push(logEntry);
            
            // 最新100件のみ保持
            if (existingLogs.length > 100) {
                existingLogs.splice(0, existingLogs.length - 100);
            }
            
            localStorage.setItem('security_logs', JSON.stringify(existingLogs));
        } catch (error) {
            console.error('Failed to log security event:', error);
        }
    }
    
    /**
     * セキュリティログの取得
     */
    static getSecurityLogs() {
        try {
            return JSON.parse(localStorage.getItem('security_logs') || '[]');
        } catch (error) {
            console.error('Failed to retrieve security logs:', error);
            return [];
        }
    }
    
    /**
     * セキュリティレポート生成
     */
    static generateSecurityReport() {
        const logs = this.getSecurityLogs();
        const report = {
            total_events: logs.length,
            event_summary: {},
            recent_events: logs.slice(-10),
            generated_at: new Date().toISOString()
        };
        
        // イベントタイプ別集計
        logs.forEach(log => {
            report.event_summary[log.type] = (report.event_summary[log.type] || 0) + 1;
        });
        
        return report;
    }
}

// セキュリティユーティリティをグローバルに公開
window.SecurityUtils = SecurityUtils;
window.SecureFormHandler = SecureFormHandler;
window.SQLSafetyUtils = SQLSafetyUtils;
window.FileSecurityUtils = FileSecurityUtils;
window.SessionSecurity = SessionSecurity;
window.SecurityAudit = SecurityAudit;

// DOM読み込み完了時にセキュリティ初期化
document.addEventListener('DOMContentLoaded', () => {
    SecurityUtils.init();
});
