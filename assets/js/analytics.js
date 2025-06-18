/*===== Google Analytics & SEO追跡ライブラリ =====*/

/**
 * アナリティクス・SEO追跡クラス
 * 就活用途に特化した分析とコンバージョン追跡
 */
class AnalyticsTracker {
    
    constructor() {
        this.gaId = 'G-XXXXXXXXXX'; // 実際のGoogle Analytics 4 ID に置き換え
        this.events = [];
        this.userInteractions = {};
        this.init();
    }
    
    /**
     * 初期化
     */
    init() {
        this.initializeGA4();
        this.setupCustomEvents();
        this.trackJobSearchKeywords();
        this.monitorUserEngagement();
    }
    
    /**
     * Google Analytics 4 初期化
     */
    initializeGA4() {
        // Google Analytics 4 スクリプト追加
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(gaScript);
        
        // gtag設定
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', this.gaId, {
            // 就活関連の強化トラッキング
            custom_map: {
                'custom_parameter_1': 'job_seeker_stage',
                'custom_parameter_2': 'recruiter_company',
                'custom_parameter_3': 'skill_interest'
            },
            // プライバシー設定
            anonymize_ip: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: false
        });
        
        // 就活特化の初期設定
        this.setupJobSeekerProperties();
    }
    
    /**
     * 就活関連のユーザープロパティ設定
     */
    setupJobSeekerProperties() {
        gtag('config', this.gaId, {
            user_properties: {
                'job_seeker_status': 'active_2025',
                'career_level': 'new_graduate',
                'specialization': 'frontend_developer',
                'location_preference': 'tokyo',
                'availability': '2025_april'
            }
        });
    }
    
    /**
     * カスタムイベント設定
     */
    setupCustomEvents() {
        // ポートフォリオ閲覧追跡
        this.trackPortfolioViews();
        
        // スキルセクション関心度
        this.trackSkillInterests();
        
        // 連絡先アクション
        this.trackContactActions();
        
        // セキュリティテスト実行
        this.trackSecurityTestUsage();
        
        // CV/履歴書ダウンロード
        this.trackCVDownloads();
    }
    
    /**
     * ポートフォリオ閲覧追跡
     */
    trackPortfolioViews() {
        const portfolioItems = document.querySelectorAll('[data-portfolio-item]');
        
        portfolioItems.forEach((item, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const projectName = item.dataset.portfolioItem || `project_${index + 1}`;
                        
                        gtag('event', 'portfolio_view', {
                            event_category: 'Portfolio',
                            event_label: projectName,
                            value: index + 1,
                            custom_parameter_1: 'portfolio_engagement'
                        });
                        
                        this.logCustomEvent('portfolio_view', {
                            project: projectName,
                            position: index + 1,
                            timestamp: new Date().toISOString()
                        });
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(item);
        });
    }
    
    /**
     * スキル関心度追跡
     */
    trackSkillInterests() {
        const skillElements = document.querySelectorAll('[data-skill]');
        
        skillElements.forEach(skill => {
            skill.addEventListener('click', () => {
                const skillName = skill.dataset.skill || skill.textContent;
                
                gtag('event', 'skill_interest', {
                    event_category: 'Skills',
                    event_label: skillName,
                    custom_parameter_3: skillName.toLowerCase()
                });
            });
            
            // ホバー時間も測定
            let hoverStart;
            skill.addEventListener('mouseenter', () => {
                hoverStart = Date.now();
            });
            
            skill.addEventListener('mouseleave', () => {
                if (hoverStart) {
                    const hoverDuration = Date.now() - hoverStart;
                    if (hoverDuration > 2000) { // 2秒以上のホバー
                        gtag('event', 'skill_deep_interest', {
                            event_category: 'Skills',
                            event_label: skill.dataset.skill || skill.textContent,
                            value: Math.round(hoverDuration / 1000)
                        });
                    }
                }
            });
        });
    }
    
    /**
     * 連絡先アクション追跡
     */
    trackContactActions() {
        // メールリンククリック
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                gtag('event', 'contact_email_click', {
                    event_category: 'Contact',
                    event_label: 'email_direct',
                    custom_parameter_1: 'high_intent_contact'
                });
            });
        });
        
        // 電話リンククリック
        const telLinks = document.querySelectorAll('a[href^="tel:"]');
        telLinks.forEach(link => {
            link.addEventListener('click', () => {
                gtag('event', 'contact_phone_click', {
                    event_category: 'Contact',
                    event_label: 'phone_direct',
                    custom_parameter_1: 'high_intent_contact'
                });
            });
        });
        
        // コンタクトフォーム送信
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                gtag('event', 'contact_form_submit', {
                    event_category: 'Contact',
                    event_label: 'form_submission',
                    custom_parameter_1: 'highest_intent_contact'
                });
            });
        }
        
        // ソーシャルリンククリック
        const socialLinks = document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"], a[href*="twitter.com"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                const platform = this.extractSocialPlatform(link.href);
                gtag('event', 'social_link_click', {
                    event_category: 'Social',
                    event_label: platform,
                    custom_parameter_1: 'professional_network'
                });
            });
        });
    }
    
    /**
     * セキュリティテスト使用追跡
     */
    trackSecurityTestUsage() {
        const securityTestBtn = document.getElementById('runSecurityTest');
        const benchmarkBtn = document.getElementById('runBenchmark');
        
        if (securityTestBtn) {
            securityTestBtn.addEventListener('click', () => {
                gtag('event', 'security_test_run', {
                    event_category: 'Technical_Demo',
                    event_label: 'security_suite',
                    custom_parameter_1: 'technical_evaluation'
                });
            });
        }
        
        if (benchmarkBtn) {
            benchmarkBtn.addEventListener('click', () => {
                gtag('event', 'security_benchmark', {
                    event_category: 'Technical_Demo',
                    event_label: 'security_score',
                    custom_parameter_1: 'technical_evaluation'
                });
            });
        }
    }
    
    /**
     * CV/履歴書ダウンロード追跡
     */
    trackCVDownloads() {
        const cvLinks = document.querySelectorAll('a[href*=".pdf"], [data-cv-download]');
        cvLinks.forEach(link => {
            link.addEventListener('click', () => {
                gtag('event', 'cv_download', {
                    event_category: 'Resume',
                    event_label: 'pdf_download',
                    custom_parameter_1: 'recruiting_funnel',
                    value: 1
                });
                
                // 高価値イベントとして追跡
                gtag('event', 'conversion', {
                    currency: 'JPY',
                    value: 100, // CV閲覧の価値を数値化
                    event_category: 'Recruitment'
                });
            });
        });
    }
    
    /**
     * 就職活動関連キーワード追跡
     */
    trackJobSearchKeywords() {
        // URLパラメータから検索キーワードを取得
        const urlParams = new URLSearchParams(window.location.search);
        const searchKeywords = [
            urlParams.get('q'),
            urlParams.get('search'),
            urlParams.get('keyword'),
            document.referrer
        ].filter(Boolean);
        
        searchKeywords.forEach(keyword => {
            if (this.isJobRelatedKeyword(keyword)) {
                gtag('event', 'job_search_keyword', {
                    event_category: 'SEO',
                    event_label: keyword,
                    custom_parameter_1: 'job_discovery'
                });
            }
        });
    }
    
    /**
     * ユーザーエンゲージメント監視
     */
    monitorUserEngagement() {
        let sessionStart = Date.now();
        let scrollDepth = 0;
        let maxScrollDepth = 0;
        
        // スクロール深度測定
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            scrollDepth = Math.round((scrollTop / docHeight) * 100);
            
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                
                // 25%, 50%, 75%, 100% でイベント送信
                if ([25, 50, 75, 100].includes(scrollDepth)) {
                    gtag('event', 'scroll_depth', {
                        event_category: 'Engagement',
                        event_label: `${scrollDepth}%`,
                        value: scrollDepth
                    });
                }
            }
        });
        
        // セッション時間測定
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - sessionStart;
            const minutes = Math.round(sessionDuration / 60000);
            
            gtag('event', 'session_duration', {
                event_category: 'Engagement',
                value: minutes,
                custom_parameter_1: minutes > 5 ? 'high_engagement' : 'normal_engagement'
            });
        });
        
        // ページの可視性変更
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                gtag('event', 'page_visibility_hidden', {
                    event_category: 'Engagement',
                    value: Math.round((Date.now() - sessionStart) / 1000)
                });
            }
        });
    }
    
    /**
     * 採用関連企業の追跡
     */
    trackRecruiterCompany() {
        // リファラーから採用関連企業を特定
        const recruiterDomains = [
            'recruit.co.jp',
            'mynavi.jp',
            'rikunabi.com',
            'indeed.com',
            'linkedin.com',
            'wantedly.com',
            'green-japan.com'
        ];
        
        const referrer = document.referrer.toLowerCase();
        const matchedRecruiter = recruiterDomains.find(domain => referrer.includes(domain));
        
        if (matchedRecruiter) {
            gtag('config', this.gaId, {
                custom_parameter_2: matchedRecruiter
            });
            
            gtag('event', 'recruiter_referral', {
                event_category: 'Traffic_Source',
                event_label: matchedRecruiter,
                custom_parameter_1: 'recruiting_channel'
            });
        }
    }
    
    /**
     * ユーティリティメソッド
     */
    extractSocialPlatform(url) {
        if (url.includes('github.com')) return 'github';
        if (url.includes('linkedin.com')) return 'linkedin';
        if (url.includes('twitter.com')) return 'twitter';
        return 'other';
    }
    
    isJobRelatedKeyword(keyword) {
        const jobKeywords = [
            'フロントエンド', 'frontend', 'javascript', 'react', 'html', 'css',
            '新卒', '採用', 'エンジニア', 'developer', '就活', 'ポートフォリオ'
        ];
        
        return jobKeywords.some(jobKeyword => 
            keyword.toLowerCase().includes(jobKeyword.toLowerCase())
        );
    }
    
    logCustomEvent(eventName, data) {
        this.events.push({
            event: eventName,
            data: data,
            timestamp: new Date().toISOString()
        });
        
        // 開発環境でのログ出力
        if (window.location.hostname === 'localhost') {
            console.log('📊 Analytics Event:', eventName, data);
        }
    }
}

// Google Search Console 準備
class SearchConsoleManager {
    
    static addSearchConsoleVerification() {
        // Google Search Console 確認用メタタグ
        const searchConsoleTag = document.createElement('meta');
        searchConsoleTag.name = 'google-site-verification';
        searchConsoleTag.content = 'YOUR_SEARCH_CONSOLE_VERIFICATION_CODE'; // 実際のコードに置き換え
        document.head.appendChild(searchConsoleTag);
    }
    
    static setupRichResults() {
        // リッチリザルト用の追加構造化データ
        const richResultsScript = document.createElement('script');
        richResultsScript.type = 'application/ld+json';
        richResultsScript.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "足立慧はどのような技術スキルを持っていますか？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "JavaScript, React, HTML5, CSS3, SASS/SCSS, Git, Webpack, ES6+ など、モダンなフロントエンド開発技術を専門としています。"
                    }
                },
                {
                    "@type": "Question",
                    "name": "どのようなプロジェクト経験がありますか？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "レスポンシブWebサイト開発、SPA開発、パフォーマンス最適化、セキュリティ対策実装など、実践的なWebアプリケーション開発経験があります。"
                    }
                }
            ]
        });
        document.head.appendChild(richResultsScript);
    }
}

// 自動初期化
document.addEventListener('DOMContentLoaded', () => {
    // Analytics 初期化（本番環境のみ）
    if (window.location.hostname !== 'localhost') {
        window.analyticsTracker = new AnalyticsTracker();
        SearchConsoleManager.addSearchConsoleVerification();
        SearchConsoleManager.setupRichResults();
    }
});

// エクスポート
window.AnalyticsTracker = AnalyticsTracker;
window.SearchConsoleManager = SearchConsoleManager;
