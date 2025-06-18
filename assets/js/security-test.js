/*===== セキュリティテストスイート =====*/

/**
 * セキュリティテストクラス
 * 各セキュリティ機能の動作を検証
 */
class SecurityTestSuite {
    
    constructor() {
        this.testResults = [];
        this.passedTests = 0;
        this.failedTests = 0;
    }
    
    /**
     * すべてのセキュリティテストを実行
     */
    runAllTests() {
        console.log('🔒 セキュリティテストスイート開始');
        console.log('=====================================');
        
        // XSS対策テスト
        this.testXSSProtection();
        
        // CSRF対策テスト
        this.testCSRFProtection();
        
        // 入力値検証テスト
        this.testInputValidation();
        
        // SQL関連セキュリティテスト
        this.testSQLSafety();
        
        // ファイルアップロードセキュリティテスト
        this.testFileUploadSecurity();
        
        // セッションセキュリティテスト
        this.testSessionSecurity();
        
        // URL検証テスト
        this.testURLSecurity();
        
        // セキュリティヘッダーテスト
        this.testSecurityHeaders();
        
        this.generateTestReport();
    }
    
    /**
     * XSS保護機能のテスト
     */
    testXSSProtection() {
        console.log('🧪 XSS保護テスト開始');
        
        const xssPayloads = [
            '<script>alert("xss")</script>',
            '<img src=x onerror=alert("xss")>',
            'javascript:alert("xss")',
            '<svg onload=alert("xss")>',
            '"><script>alert("xss")</script>'
        ];
        
        xssPayloads.forEach((payload, index) => {
            const escaped = SecurityUtils.escapeHTML(payload);
            const sanitized = SecurityUtils.sanitizeHTML(payload);
            
            const isSecure = !escaped.includes('<script>') && 
                           !sanitized.includes('<script>') &&
                           !escaped.includes('javascript:') &&
                           !sanitized.includes('javascript:');
            
            this.addTestResult(
                `XSS Test ${index + 1}`,
                isSecure,
                `Payload: ${payload.substring(0, 30)}...`
            );
        });
    }
    
    /**
     * CSRF保護機能のテスト
     */
    testCSRFProtection() {
        console.log('🧪 CSRF保護テスト開始');
        
        // トークン生成テスト
        const token1 = SecurityUtils.generateCSRFToken();
        const token2 = SecurityUtils.generateCSRFToken();
        
        this.addTestResult(
            'CSRF Token Generation',
            token1 && token2 && token1 !== token2 && token1.length === 64,
            `Token1: ${token1.substring(0, 10)}...`
        );
        
        // トークン検証テスト
        SecurityUtils.setCSRFToken();
        const storedToken = sessionStorage.getItem('csrf_token');
        const isValid = SecurityUtils.validateCSRFToken(storedToken);
        const isInvalid = !SecurityUtils.validateCSRFToken('invalid_token');
        
        this.addTestResult(
            'CSRF Token Validation',
            isValid && isInvalid,
            `Valid token accepted, invalid token rejected`
        );
    }
    
    /**
     * 入力値検証テスト
     */
    testInputValidation() {
        console.log('🧪 入力値検証テスト開始');
        
        // メールアドレス検証
        const validEmails = ['test@example.com', 'user.name@domain.co.jp'];
        const invalidEmails = ['invalid-email', '@domain.com', 'test@'];
        
        const emailTestsPassed = validEmails.every(email => 
            SecurityUtils.validateInput(email, 'email') === email
        ) && invalidEmails.every(email => 
            SecurityUtils.validateInput(email, 'email') === ''
        );
        
        this.addTestResult(
            'Email Validation',
            emailTestsPassed,
            'Valid emails accepted, invalid emails rejected'
        );
        
        // 名前検証
        const validNames = ['田中太郎', 'John Doe', 'Maria García'];
        const invalidNames = ['<script>', ''; DROP TABLE users; --'];
        
        const nameTestsPassed = validNames.every(name => 
            SecurityUtils.validateInput(name, 'name').length > 0
        ) && invalidNames.every(name => 
            !SecurityUtils.validateInput(name, 'name').includes('<') &&
            !SecurityUtils.validateInput(name, 'name').includes('DROP')
        );
        
        this.addTestResult(
            'Name Validation',
            nameTestsPassed,
            'Valid names accepted, dangerous input sanitized'
        );
    }
    
    /**
     * SQL安全性テスト
     */
    testSQLSafety() {
        console.log('🧪 SQL安全性テスト開始');
        
        const sqlInjectionAttempts = [
            "'; DROP TABLE users; --",
            "admin' OR '1'='1",
            "UNION SELECT password FROM users",
            "'; EXEC xp_cmdshell('dir'); --",
            "1' OR 1=1 #"
        ];
        
        const allDetected = sqlInjectionAttempts.every(attempt => 
            SQLSafetyUtils.checkForSQLPatterns(attempt)
        );
        
        this.addTestResult(
            'SQL Injection Detection',
            allDetected,
            'All SQL injection patterns detected'
        );
        
        // サニタイゼーションテスト
        const dangerousInput = "'; DROP TABLE users; --";
        const sanitized = SQLSafetyUtils.sanitizeForDatabase(dangerousInput);
        const isSafe = !sanitized.includes(';') && !sanitized.includes('--');
        
        this.addTestResult(
            'SQL Input Sanitization',
            isSafe,
            'Dangerous characters properly escaped'
        );
    }
    
    /**
     * ファイルアップロードセキュリティテスト
     */
    testFileUploadSecurity() {
        console.log('🧪 ファイルアップロードセキュリティテスト開始');
        
        // モックファイルオブジェクト作成
        const createMockFile = (name, type, size) => ({
            name: name,
            type: type,
            size: size
        });
        
        // 安全なファイル
        const safeFile = createMockFile('document.pdf', 'application/pdf', 1024 * 1024);
        const safeResult = FileSecurityUtils.validateFile(safeFile);
        
        // 危険なファイル
        const dangerousFile = createMockFile('virus.exe', 'application/exe', 1024);
        const dangerousResult = FileSecurityUtils.validateFile(dangerousFile);
        
        // 大きすぎるファイル
        const largeFile = createMockFile('large.jpg', 'image/jpeg', 10 * 1024 * 1024);
        const largeResult = FileSecurityUtils.validateFile(largeFile);
        
        this.addTestResult(
            'File Upload Validation',
            safeResult.isValid && !dangerousResult.isValid && !largeResult.isValid,
            'Safe files accepted, dangerous/large files rejected'
        );
        
        // ファイル名安全性テスト
        const dangerousFilename = 'con.txt';
        const isDangerous = FileSecurityUtils.containsDangerousChars(dangerousFilename);
        
        this.addTestResult(
            'Filename Safety Check',
            isDangerous,
            'Dangerous filename detected'
        );
    }
    
    /**
     * セッションセキュリティテスト
     */
    testSessionSecurity() {
        console.log('🧪 セッションセキュリティテスト開始');
        
        // セッション開始
        const sessionId = SessionSecurity.startSession();
        const isValid = SessionSecurity.isSessionValid();
        
        this.addTestResult(
            'Session Management',
            sessionId && isValid,
            'Session successfully created and validated'
        );
        
        // セッション更新
        SessionSecurity.refreshSession();
        const stillValid = SessionSecurity.isSessionValid();
        
        this.addTestResult(
            'Session Refresh',
            stillValid,
            'Session successfully refreshed'
        );
    }
    
    /**
     * URL セキュリティテスト
     */
    testURLSecurity() {
        console.log('🧪 URL セキュリティテスト開始');
        
        const validUrls = [
            'https://example.com',
            'http://localhost:3000',
            'mailto:test@example.com'
        ];
        
        const invalidUrls = [
            'javascript:alert("xss")',
            'data:text/html,<script>alert("xss")</script>',
            'file:///etc/passwd',
            'ftp://malicious.site'
        ];
        
        const validUrlsPass = validUrls.every(url => SecurityUtils.isValidURL(url));
        const invalidUrlsFail = invalidUrls.every(url => !SecurityUtils.isValidURL(url));
        
        this.addTestResult(
            'URL Validation',
            validUrlsPass && invalidUrlsFail,
            'Valid URLs accepted, dangerous URLs rejected'
        );
    }
    
    /**
     * セキュリティヘッダーテスト
     */
    testSecurityHeaders() {
        console.log('🧪 セキュリティヘッダーテスト開始');
        
        // メタタグの存在確認
        const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        const frameMeta = document.querySelector('meta[http-equiv="X-Frame-Options"]');
        const xssMeta = document.querySelector('meta[http-equiv="X-XSS-Protection"]');
        
        this.addTestResult(
            'Security Headers Present',
            cspMeta && frameMeta && xssMeta,
            'All required security headers found'
        );
        
        // CSP設定の確認
        if (cspMeta) {
            const cspContent = cspMeta.getAttribute('content');
            const hasDefaultSrc = cspContent.includes("default-src 'self'");
            const hasFrameSrc = cspContent.includes("frame-src 'none'");
            
            this.addTestResult(
                'CSP Configuration',
                hasDefaultSrc && hasFrameSrc,
                'CSP properly configured'
            );
        }
    }
    
    /**
     * テスト結果を追加
     */
    addTestResult(testName, passed, details) {
        const result = {
            name: testName,
            passed: passed,
            details: details,
            timestamp: new Date().toISOString()
        };
        
        this.testResults.push(result);
        
        if (passed) {
            this.passedTests++;
            console.log(`✅ ${testName}: PASSED - ${details}`);
        } else {
            this.failedTests++;
            console.log(`❌ ${testName}: FAILED - ${details}`);
        }
    }
    
    /**
     * テストレポート生成
     */
    generateTestReport() {
        console.log('\n📊 セキュリティテスト結果');
        console.log('=====================================');
        console.log(`✅ 成功: ${this.passedTests} テスト`);
        console.log(`❌ 失敗: ${this.failedTests} テスト`);
        console.log(`📈 成功率: ${((this.passedTests / this.testResults.length) * 100).toFixed(1)}%`);
        
        if (this.failedTests > 0) {
            console.log('\n⚠️ 失敗したテスト:');
            this.testResults
                .filter(result => !result.passed)
                .forEach(result => {
                    console.log(`   - ${result.name}: ${result.details}`);
                });
        }
        
        // セキュリティレポートとしてローカルストレージに保存
        const report = {
            timestamp: new Date().toISOString(),
            total_tests: this.testResults.length,
            passed: this.passedTests,
            failed: this.failedTests,
            success_rate: (this.passedTests / this.testResults.length) * 100,
            details: this.testResults
        };
        
        try {
            localStorage.setItem('security_test_report', JSON.stringify(report));
            console.log('\n💾 テストレポートがローカルストレージに保存されました');
        } catch (error) {
            console.error('テストレポートの保存に失敗:', error);
        }
        
        return report;
    }
    
    /**
     * セキュリティレポートの取得
     */
    static getLastReport() {
        try {
            const report = localStorage.getItem('security_test_report');
            return report ? JSON.parse(report) : null;
        } catch (error) {
            console.error('セキュリティレポートの取得に失敗:', error);
            return null;
        }
    }
}

/**
 * セキュリティベンチマーク
 */
class SecurityBenchmark {
    
    /**
     * セキュリティスコア計算
     */
    static calculateSecurityScore() {
        const criteria = {
            csp_enabled: this.checkCSP(),
            xss_protection: this.checkXSSProtection(),
            csrf_protection: this.checkCSRFProtection(),
            input_validation: this.checkInputValidation(),
            secure_headers: this.checkSecurityHeaders(),
            session_security: this.checkSessionSecurity(),
            url_validation: this.checkURLValidation(),
            sql_safety: this.checkSQLSafety()
        };
        
        const totalCriteria = Object.keys(criteria).length;
        const passedCriteria = Object.values(criteria).filter(Boolean).length;
        const score = (passedCriteria / totalCriteria) * 100;
        
        return {
            score: Math.round(score),
            criteria: criteria,
            recommendation: this.getSecurityRecommendations(criteria)
        };
    }
    
    static checkCSP() {
        return !!document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    }
    
    static checkXSSProtection() {
        return typeof SecurityUtils !== 'undefined' && 
               typeof SecurityUtils.escapeHTML === 'function';
    }
    
    static checkCSRFProtection() {
        return typeof SecurityUtils !== 'undefined' && 
               typeof SecurityUtils.generateCSRFToken === 'function';
    }
    
    static checkInputValidation() {
        return typeof SecurityUtils !== 'undefined' && 
               typeof SecurityUtils.validateInput === 'function';
    }
    
    static checkSecurityHeaders() {
        const headers = ['Content-Security-Policy', 'X-Frame-Options', 'X-XSS-Protection'];
        return headers.every(header => 
            document.querySelector(`meta[http-equiv="${header}"]`)
        );
    }
    
    static checkSessionSecurity() {
        return typeof SessionSecurity !== 'undefined';
    }
    
    static checkURLValidation() {
        return typeof SecurityUtils !== 'undefined' && 
               typeof SecurityUtils.isValidURL === 'function';
    }
    
    static checkSQLSafety() {
        return typeof SQLSafetyUtils !== 'undefined';
    }
    
    static getSecurityRecommendations(criteria) {
        const recommendations = [];
        
        if (!criteria.csp_enabled) {
            recommendations.push('Content Security Policy (CSP) の実装');
        }
        if (!criteria.xss_protection) {
            recommendations.push('XSS保護機能の強化');
        }
        if (!criteria.csrf_protection) {
            recommendations.push('CSRF保護の実装');
        }
        if (!criteria.input_validation) {
            recommendations.push('入力値検証の強化');
        }
        if (!criteria.secure_headers) {
            recommendations.push('セキュリティヘッダーの追加');
        }
        
        return recommendations;
    }
}

// グローバルに公開
window.SecurityTestSuite = SecurityTestSuite;
window.SecurityBenchmark = SecurityBenchmark;

// UI経由でのテスト実行のため、自動実行はコメントアウト
/*
// 開発環境では自動的にテストを実行
if (window.location.hostname === 'localhost') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            console.log('🔧 開発環境でセキュリティテストを実行します...');
            const testSuite = new SecurityTestSuite();
            testSuite.runAllTests();
            
            const benchmark = SecurityBenchmark.calculateSecurityScore();
            console.log(`\n🏆 セキュリティスコア: ${benchmark.score}/100`);
            if (benchmark.recommendation.length > 0) {
                console.log('💡 改善提案:', benchmark.recommendation);
            }
        }, 2000);
    });
}
*/

// セキュリティテストスイートが正常に読み込まれたことをログ出力
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔒 セキュリティテストスイートが読み込まれました');
    console.log('💡 セキュリティテストは「Security」セクションから実行できます');
});
