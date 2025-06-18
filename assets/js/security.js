/*===== セキュリティライブラリ（安全なウェブサイトの作り方準拠） =====*/

/**
 * 高度なXSS対策クラス
 * IPAガイドライン「安全なウェブサイトの作り方」に準拠
 */
class AdvancedXSSProtection {
    
    /**
     * 出力時のHTMLエスケープ（基本対策）
     * 全ての動的出力に適用必須
     */
    static escapeHTMLCharacters(str) {
        if (typeof str !== 'string') return '';
        
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        
        return str.replace(/[&<>"'`=\/]/g, (char) => escapeMap[char]);
    }
    
    /**
     * 属性値の安全な設定
     * HTML属性への値設定時のXSS対策
     */
    static escapeHTMLAttribute(str) {
        if (typeof str !== 'string') return '';
        
        // 属性値で特に危険な文字をエスケープ
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .replace(/=/g, '&#x3D;')
            .replace(/`/g, '&#x60;')
            .replace(/\n/g, '&#x0A;')
            .replace(/\r/g, '&#x0D;')
            .replace(/\t/g, '&#x09;');
    }
    
    /**
     * JavaScript文字列の安全なエスケープ
     * 動的なスクリプト生成時の対策
     */
    static escapeJavaScript(str) {
        if (typeof str !== 'string') return '';
        
        return str
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/\//g, '\\/')
            .replace(/</g, '\\u003C')
            .replace(/>/g, '\\u003E');
    }
    
    /**
     * URL安全化処理
     * href属性やsrc属性に設定する際の対策
     */
    static sanitizeURL(url) {
        if (typeof url !== 'string') return '';
        
        // 危険なプロトコルをブロック
        const dangerousProtocols = [
            'javascript:',
            'data:text/html',
            'data:application',
            'vbscript:',
            'file:',
            'ftp:'
        ];
        
        const urlLower = url.toLowerCase().trim();
        for (const protocol of dangerousProtocols) {
            if (urlLower.startsWith(protocol)) {
                console.warn('Dangerous protocol detected:', protocol);
                return '#';
            }
        }
        
        // 相対URLと安全なプロトコルのみ許可
        if (url.startsWith('/') || url.startsWith('./') || 
            url.startsWith('http://') || url.startsWith('https://') ||
            url.startsWith('mailto:') || url.startsWith('#')) {
            return this.escapeHTMLAttribute(url);
        }
        
        return '#';
    }
    
    /**
     * DOM操作の安全化
     * innerHTML代替の安全な要素作成
     */
    static createSafeElement(tagName, content, attributes = {}) {
        const element = document.createElement(tagName);
        
        // テキストコンテンツの安全な設定
        if (content) {
            element.textContent = content; // innerHTMLではなくtextContentを使用
        }
        
        // 属性の安全な設定
        for (const [key, value] of Object.entries(attributes)) {
            if (this.isSafeAttribute(key)) {
                element.setAttribute(key, this.escapeHTMLAttribute(value));
            }
        }
        
        return element;
    }
    
    /**
     * 安全な属性の判定
     * XSSに悪用されやすい属性をブロック
     */
    static isSafeAttribute(attrName) {
        const dangerousAttributes = [
            'onclick', 'onload', 'onerror', 'onmouseover', 'onfocus',
            'onblur', 'onchange', 'onsubmit', 'onreset', 'onselect',
            'onkeydown', 'onkeyup', 'onkeypress', 'onmousedown',
            'onmouseup', 'onmousemove', 'onmouseout', 'oncontextmenu'
        ];
        
        return !dangerousAttributes.includes(attrName.toLowerCase());
    }
    
    /**
     * Content Security Policy違反の監視
     */
    static initCSPViolationReporting() {
        document.addEventListener('securitypolicyviolation', (event) => {
            const violationData = {
                blockedURI: event.blockedURI,
                documentURI: event.documentURI,
                effectiveDirective: event.effectiveDirective,
                originalPolicy: event.originalPolicy,
                referrer: event.referrer,
                violatedDirective: event.violatedDirective,
                timestamp: new Date().toISOString()
            };
            
            console.error('CSP Violation detected:', violationData);
            this.logSecurityEvent('CSP_VIOLATION', violationData);
        });
    }
    
    /**
     * セキュリティイベントのログ記録
     */
    static logSecurityEvent(eventType, data) {
        const logEntry = {
            type: eventType,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            data: data
        };
        
        // セキュリティログの保存（本番環境では外部サービスに送信）
        const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
        securityLogs.push(logEntry);
        
        // ログサイズ制限（最新100件まで保持）
        if (securityLogs.length > 100) {
            securityLogs.splice(0, securityLogs.length - 100);
        }
        
        localStorage.setItem('security_logs', JSON.stringify(securityLogs));
        console.warn('Security event logged:', eventType, data);
    }
}

/**
 * 強化されたCSRF対策クラス
 * 「安全なウェブサイトの作り方」ガイドライン準拠
 */
class EnhancedCSRFProtection {
    
    /**
     * より強力なCSRFトークン生成
     * - より長いトークン長
     * - より強力な乱数生成
     * - トークンの有効期限管理
     */
    static generateSecureCSRFToken() {
        // 64バイト（512ビット）の強力なトークン
        const array = new Uint8Array(64);
        crypto.getRandomValues(array);
        
        const token = Array.from(array, byte => 
            byte.toString(16).padStart(2, '0')
        ).join('');
        
        // トークンに有効期限を追加（1時間）
        const expiryTime = Date.now() + (60 * 60 * 1000);
        
        return {
            token: token,
            expiry: expiryTime,
            created: Date.now()
        };
    }
    
    /**
     * トークンの検証（有効期限チェック付き）
     */
    static validateCSRFTokenWithExpiry(submittedToken) {
        const storedTokenData = JSON.parse(
            sessionStorage.getItem('csrf_token_data') || '{}'
        );
        
        if (!storedTokenData.token || !storedTokenData.expiry) {
            console.warn('CSRF token not found or malformed');
            return false;
        }
        
        // 有効期限チェック
        if (Date.now() > storedTokenData.expiry) {
            console.warn('CSRF token expired');
            sessionStorage.removeItem('csrf_token_data');
            return false;
        }
        
        // トークン一致チェック
        const isValid = storedTokenData.token === submittedToken;
        if (!isValid) {
            AdvancedXSSProtection.logSecurityEvent('CSRF_TOKEN_MISMATCH', {
                submittedToken: submittedToken.substring(0, 8) + '...',
                timestamp: new Date().toISOString()
            });
        }
        
        return isValid;
    }
    
    /**
     * リファラーチェック強化版
     * Origin ヘッダーとの組み合わせチェック
     */
    static validateReferrerAndOrigin() {
        const currentOrigin = window.location.origin;
        const referrer = document.referrer;
        
        // Same-Origin Policy の厳格なチェック
        if (referrer && !referrer.startsWith(currentOrigin)) {
            AdvancedXSSProtection.logSecurityEvent('INVALID_REFERRER', {
                referrer: referrer,
                currentOrigin: currentOrigin,
                timestamp: new Date().toISOString()
            });
            return false;
        }
        
        return true;
    }
    
    /**
     * SameSite Cookie 設定の検証
     * (フロントエンドでの確認用)
     */
    static validateSameSiteCookies() {
        // 開発者向けのガイドライン確認
        const cookieGuidelines = {
            sameSite: 'Strict または Lax を推奨',
            secure: 'HTTPS環境では必須',
            httpOnly: 'XSS対策として推奨（JavaScript不要なCookieの場合）'
        };
        
        console.info('Cookie Security Guidelines:', cookieGuidelines);
        
        // 既存のCookieのSameSite設定確認
        const cookies = document.cookie.split(';');
        let hasInsecureCookies = false;
        
        cookies.forEach(cookie => {
            if (cookie.trim() && !cookie.includes('SameSite=')) {
                hasInsecureCookies = true;
                console.warn('Cookie without SameSite found:', cookie.trim());
            }
        });
        
        return !hasInsecureCookies;
    }
    
    /**
     * フォーム送信時の包括的CSRF検証
     */
    static validateFormSubmission(form, token) {
        // 1. CSRFトークン検証
        if (!this.validateCSRFTokenWithExpiry(token)) {
            return { valid: false, reason: 'Invalid CSRF token' };
        }
        
        // 2. リファラー検証
        if (!this.validateReferrerAndOrigin()) {
            return { valid: false, reason: 'Invalid referrer' };
        }
        
        // 3. フォームメソッド検証
        const method = form.method.toUpperCase();
        if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
            return { valid: false, reason: 'Invalid form method for CSRF protection' };
        }
        
        // 4. 送信頻度制限（Brute Force対策）
        if (!this.checkSubmissionRate()) {
            return { valid: false, reason: 'Too many submissions' };
        }
        
        return { valid: true, reason: 'Validation passed' };
    }
    
    /**
     * 送信頻度制限チェック
     */
    static checkSubmissionRate() {
        const now = Date.now();
        const submissionHistory = JSON.parse(
            sessionStorage.getItem('submission_history') || '[]'
        );
        
        // 1分以内の送信回数制限（5回まで）
        const recentSubmissions = submissionHistory.filter(
            time => now - time < 60000
        );
        
        if (recentSubmissions.length >= 5) {
            AdvancedXSSProtection.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
                submissionCount: recentSubmissions.length,
                timeWindow: '1 minute',
                timestamp: new Date().toISOString()
            });
            return false;
        }
        
        // 送信履歴に追加
        submissionHistory.push(now);
        
        // 古い履歴を削除（24時間以上前）
        const filteredHistory = submissionHistory.filter(
            time => now - time < 24 * 60 * 60 * 1000
        );
        
        sessionStorage.setItem('submission_history', JSON.stringify(filteredHistory));
        return true;
    }
}

/*===== セキュリティユーティリティ =====*/

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

/**
 * 強化された入力値検証クラス
 * 「安全なウェブサイトの作り方」ガイドライン準拠
 */
class EnhancedInputValidation {
    
    /**
     * 厳格な入力値長制限
     */
    static MAX_LENGTHS = {
        name: 100,
        email: 254,  // RFC5321準拠
        subject: 200,
        message: 2000,
        phone: 20,
        url: 2048
    };
    
    /**
     * 危険な文字列パターン
     */
    static DANGEROUS_PATTERNS = [
        // スクリプトインジェクション
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /vbscript:/gi,
        /on\w+\s*=/gi,
        
        // SQL インジェクション
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|CREATE|ALTER)\b)/gi,
        /(--|\/\*|\*\/|;|'|"|\||&)/g,
        
        // HTML インジェクション
        /<[^>]+>/g,
        /&[#\w]+;/g,
        
        // コマンドインジェクション
        /(\||&|;|`|\$\(|\${)/g,
        
        // LDAP インジェクション
        /(\*|\(|\)|\\|\/)/g
    ];
    
    /**
     * 名前フィールドの厳格な検証
     */
    static validateName(name) {
        if (!name || typeof name !== 'string') {
            return { valid: false, message: '名前が入力されていません。' };
        }
        
        const trimmedName = name.trim();
        
        // 長さチェック
        if (trimmedName.length === 0) {
            return { valid: false, message: '名前が入力されていません。' };
        }
        
        if (trimmedName.length > this.MAX_LENGTHS.name) {
            return { 
                valid: false, 
                message: `名前は${this.MAX_LENGTHS.name}文字以内で入力してください。` 
            };
        }
        
        // 危険なパターンチェック
        if (this.containsDangerousPattern(trimmedName)) {
            AdvancedXSSProtection.logSecurityEvent('DANGEROUS_INPUT_DETECTED', {
                field: 'name',
                input: trimmedName.substring(0, 20) + '...',
                timestamp: new Date().toISOString()
            });
            return { valid: false, message: '不正な文字が含まれています。' };
        }
        
        // 日本語・英数字・ひらがな・カタカナ・一般的な記号のみ許可
        const namePattern = /^[a-zA-Z0-9ひらがなカタカナ漢字\s\-_\.]+$/u;
        if (!namePattern.test(trimmedName)) {
            return { valid: false, message: '名前に使用できない文字が含まれています。' };
        }
        
        return { valid: true, value: AdvancedXSSProtection.escapeHTMLCharacters(trimmedName) };
    }
    
    /**
     * メールアドレスの厳格な検証
     */
    static validateEmail(email) {
        if (!email || typeof email !== 'string') {
            return { valid: false, message: 'メールアドレスが入力されていません。' };
        }
        
        const trimmedEmail = email.trim().toLowerCase();
        
        // 長さチェック
        if (trimmedEmail.length > this.MAX_LENGTHS.email) {
            return { 
                valid: false, 
                message: `メールアドレスは${this.MAX_LENGTHS.email}文字以内で入力してください。` 
            };
        }
        
        // RFC5322準拠の厳格なメール検証
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if (!emailPattern.test(trimmedEmail)) {
            return { valid: false, message: '正しいメールアドレスを入力してください。' };
        }
        
        // 危険なパターンチェック
        if (this.containsDangerousPattern(trimmedEmail)) {
            AdvancedXSSProtection.logSecurityEvent('DANGEROUS_INPUT_DETECTED', {
                field: 'email',
                input: trimmedEmail.substring(0, 20) + '...',
                timestamp: new Date().toISOString()
            });
            return { valid: false, message: '不正な文字が含まれています。' };
        }
        
        // ドメイン部分の追加検証
        const [localPart, domain] = trimmedEmail.split('@');
        if (domain && !this.isValidDomain(domain)) {
            return { valid: false, message: '無効なドメインです。' };
        }
        
        return { valid: true, value: trimmedEmail };
    }
    
    /**
     * メッセージ内容の厳格な検証
     */
    static validateMessage(message) {
        if (!message || typeof message !== 'string') {
            return { valid: false, message: 'メッセージが入力されていません。' };
        }
        
        const trimmedMessage = message.trim();
        
        // 長さチェック
        if (trimmedMessage.length === 0) {
            return { valid: false, message: 'メッセージが入力されていません。' };
        }
        
        if (trimmedMessage.length > this.MAX_LENGTHS.message) {
            return { 
                valid: false, 
                message: `メッセージは${this.MAX_LENGTHS.message}文字以内で入力してください。` 
            };
        }
        
        // 危険なパターンチェック（より厳格）
        for (const pattern of this.DANGEROUS_PATTERNS) {
            if (pattern.test(trimmedMessage)) {
                AdvancedXSSProtection.logSecurityEvent('DANGEROUS_INPUT_DETECTED', {
                    field: 'message',
                    pattern: pattern.toString(),
                    input: trimmedMessage.substring(0, 50) + '...',
                    timestamp: new Date().toISOString()
                });
                return { valid: false, message: '不正な文字またはコードが含まれています。' };
            }
        }
        
        // スパム的な繰り返しパターンのチェック
        if (this.isSpamLikeContent(trimmedMessage)) {
            return { valid: false, message: 'スパムの可能性があるコンテンツです。' };
        }
        
        return { valid: true, value: AdvancedXSSProtection.escapeHTMLCharacters(trimmedMessage) };
    }
    
    /**
     * ドメインの有効性チェック
     */
    static isValidDomain(domain) {
        // 基本的なドメイン形式チェック
        const domainPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if (!domainPattern.test(domain)) {
            return false;
        }
        
        // 危険なドメインパターンのブラックリスト
        const dangerousDomains = [
            'example.com',
            'test.com',
            'localhost',
            '127.0.0.1',
            'tempmail',
            '10minutemail',
            'guerrillamail'
        ];
        
        for (const dangerous of dangerousDomains) {
            if (domain.includes(dangerous)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * 危険なパターンが含まれているかチェック
     */
    static containsDangerousPattern(input) {
        // 基本的な危険パターン
        const basicPatterns = [
            /<script/gi,
            /javascript:/gi,
            /on\w+=/gi,
            /<iframe/gi,
            /<object/gi,
            /<embed/gi,
            /\beval\(/gi,
            /\bexec\(/gi
        ];
        
        return basicPatterns.some(pattern => pattern.test(input));
    }
    
    /**
     * スパム的なコンテンツの検出
     */
    static isSpamLikeContent(message) {
        // 同じ文字の連続（10文字以上）
        if (/(.)\1{9,}/.test(message)) {
            return true;
        }
        
        // 過度な大文字使用（80%以上）
        const upperCaseRatio = (message.match(/[A-Z]/g) || []).length / message.length;
        if (upperCaseRatio > 0.8 && message.length > 20) {
            return true;
        }
        
        // 多数のURLパターン
        const urlPattern = /(https?:\/\/[^\s]+)/gi;
        const urls = message.match(urlPattern) || [];
        if (urls.length > 3) {
            return true;
        }
        
        return false;
    }
    
    /**
     * 包括的なフォーム検証
     */
    static validateContactForm(formData) {
        const results = {
            valid: true,
            errors: {},
            sanitizedData: {}
        };
        
        // 名前の検証
        const nameResult = this.validateName(formData.name);
        if (!nameResult.valid) {
            results.valid = false;
            results.errors.name = nameResult.message;
        } else {
            results.sanitizedData.name = nameResult.value;
        }
        
        // メールの検証
        const emailResult = this.validateEmail(formData.email);
        if (!emailResult.valid) {
            results.valid = false;
            results.errors.email = emailResult.message;
        } else {
            results.sanitizedData.email = emailResult.value;
        }
        
        // メッセージの検証
        const messageResult = this.validateMessage(formData.message);
        if (!messageResult.valid) {
            results.valid = false;
            results.errors.message = messageResult.message;
        } else {
            results.sanitizedData.message = messageResult.value;
        }
        
        // 件名の検証（オプション）
        if (formData.subject) {
            const subjectResult = this.validateMessage(formData.subject);
            if (!subjectResult.valid) {
                results.valid = false;
                results.errors.subject = subjectResult.message;
            } else {
                results.sanitizedData.subject = subjectResult.value;
            }
        }
        
        return results;
    }
}

/**
 * セキュアなCookie管理クラス
 * 「安全なウェブサイトの作り方」準拠
 */
class SecureCookieManager {
    
    /**
     * セキュアなCookie設定のガイドライン
     */
    static SECURITY_GUIDELINES = {
        httpOnly: 'サーバーサイドのみ。XSS攻撃からCookieを保護',
        secure: 'HTTPS通信でのみ送信。盗聴対策',
        sameSite: 'CSRF攻撃対策。Strict/Lax/Noneを適切に設定',
        maxAge: '適切な有効期限設定。長期間の保持を避ける',
        domain: 'スコープを適切に制限',
        path: 'アクセス範囲を最小限に制限'
    };
    
    /**
     * セキュアなCookie設定（クライアントサイド用）
     * GitHub Pages環境での制限を考慮
     */
    static setSecureCookie(name, value, options = {}) {
        if (!name || !value) {
            console.error('Cookie name and value are required');
            return false;
        }
        
        // デフォルトのセキュア設定
        const defaultOptions = {
            maxAge: 3600, // 1時間
            sameSite: 'Strict',
            secure: window.location.protocol === 'https:',
            path: '/'
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
        
        // セキュリティ属性の追加
        if (finalOptions.maxAge) {
            cookieString += `; Max-Age=${finalOptions.maxAge}`;
        }
        
        if (finalOptions.sameSite) {
            cookieString += `; SameSite=${finalOptions.sameSite}`;
        }
        
        if (finalOptions.secure) {
            cookieString += `; Secure`;
        }
        
        if (finalOptions.path) {
            cookieString += `; Path=${finalOptions.path}`;
        }
        
        if (finalOptions.domain) {
            cookieString += `; Domain=${finalOptions.domain}`;
        }
        
        // HttpOnly は JavaScript では設定できないため、ガイドラインとして記録
        if (finalOptions.httpOnly) {
            console.info('HttpOnly flag should be set server-side for security');
        }
        
        try {
            document.cookie = cookieString;
            
            // セキュリティログに記録
            AdvancedXSSProtection.logSecurityEvent('SECURE_COOKIE_SET', {
                name: name,
                options: finalOptions,
                timestamp: new Date().toISOString()
            });
            
            return true;
        } catch (error) {
            console.error('Failed to set secure cookie:', error);
            return false;
        }
    }
    
    /**
     * セキュアなCookie読み取り
     */
    static getSecureCookie(name) {
        if (!name) {
            return null;
        }
        
        const encodedName = encodeURIComponent(name) + '=';
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(encodedName) === 0) {
                const value = cookie.substring(encodedName.length);
                try {
                    return decodeURIComponent(value);
                } catch (error) {
                    console.error('Failed to decode cookie value:', error);
                    return null;
                }
            }
        }
        
        return null;
    }
    
    /**
     * セキュアなCookie削除
     */
    static deleteSecureCookie(name, path = '/') {
        if (!name) {
            return false;
        }
        
        // 過去の日付を設定して削除
        const deleteString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}`;
        
        // セキュア環境では Secure フラグも必要
        if (window.location.protocol === 'https:') {
            document.cookie = deleteString + '; Secure';
        } else {
            document.cookie = deleteString;
        }
        
        AdvancedXSSProtection.logSecurityEvent('SECURE_COOKIE_DELETED', {
            name: name,
            timestamp: new Date().toISOString()
        });
        
        return true;
    }
    
    /**
     * 既存Cookieのセキュリティ監査
     */
    static auditCookieSecurity() {
        const cookies = document.cookie.split(';');
        const audit = {
            total: cookies.length,
            secure: 0,
            insecure: [],
            recommendations: []
        };
        
        cookies.forEach(cookie => {
            const trimmed = cookie.trim();
            if (trimmed) {
                const [nameValue] = trimmed.split('=');
                const name = nameValue ? nameValue.trim() : '';
                
                // セキュリティ属性のチェック（制限あり）
                if (!trimmed.includes('SameSite=')) {
                    audit.insecure.push({
                        name: name,
                        issue: 'SameSite attribute missing'
                    });
                }
                
                // HTTPS環境でSecureフラグのチェック
                if (window.location.protocol === 'https:' && !trimmed.includes('Secure')) {
                    audit.insecure.push({
                        name: name,
                        issue: 'Secure flag missing in HTTPS environment'
                    });
                }
            }
        });
        
        // 推奨事項の生成
        if (audit.insecure.length > 0) {
            audit.recommendations.push('SameSite属性をすべてのCookieに設定');
            audit.recommendations.push('HTTPS環境ではSecureフラグを設定');
            audit.recommendations.push('機密データを含むCookieにはHttpOnlyフラグをサーバーサイドで設定');
        }
        
        console.info('Cookie Security Audit:', audit);
        
        AdvancedXSSProtection.logSecurityEvent('COOKIE_SECURITY_AUDIT', {
            audit: audit,
            timestamp: new Date().toISOString()
        });
        
        return audit;
    }
    
    /**
     * Cookie セキュリティガイドラインの表示
     */
    static displaySecurityGuidelines() {
        console.group('🍪 Cookie Security Guidelines');
        
        Object.entries(this.SECURITY_GUIDELINES).forEach(([attribute, description]) => {
            console.info(`${attribute}: ${description}`);
        });
        
        console.info('\n📋 実装チェックリスト:');
        console.info('✅ セッション管理用Cookieには HttpOnly + Secure + SameSite=Strict');
        console.info('✅ 長期保存Cookieには適切な有効期限設定');
        console.info('✅ 第三者Cookieが必要な場合のみ SameSite=None');
        console.info('✅ 本番環境では必ず Secure フラグを設定');
        
        console.groupEnd();
    }
}

// セキュリティユーティリティをグローバルに公開
window.SecurityUtils = SecurityUtils;
window.SecureFormHandler = SecureFormHandler;
window.SQLSafetyUtils = SQLSafetyUtils;
window.FileSecurityUtils = FileSecurityUtils;
window.SessionSecurity = SessionSecurity;
window.SecurityAudit = SecurityAudit;
window.SecureCookieManager = SecureCookieManager;

// DOM読み込み完了時にセキュリティ初期化
document.addEventListener('DOMContentLoaded', () => {
    SecurityUtils.init();
});
