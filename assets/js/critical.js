/**
 * Critical JavaScript - 最初の描画に必要な最小限のスクリプト
 * @description Above the foldコンテンツの表示に必要な必須機能のみ
 * @author 足立慧 (Kei Adachi)
 * @version 1.0.0
 */

(function() {
    'use strict';

    // パフォーマンス測定開始
    const criticalStartTime = performance.now();

    /**
     * Critical CSS適用の確認
     */
    function ensureCriticalCSS() {
        const criticalLink = document.querySelector('link[href*="critical.css"]');
        if (!criticalLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'assets/css/critical.css';
            link.media = 'all';
            document.head.appendChild(link);
        }
    }

    /**
     * フォント読み込み最適化
     */
    function optimizeFontLoading() {
        // フォント表示最適化
        if ('fonts' in document) {
            // Noto Sans JP プリロード
            const notoFont = new FontFace(
                'Noto Sans JP',
                'url(assets/fonts/NotoSansJP-Regular.woff2) format("woff2")',
                {
                    display: 'swap',
                    style: 'normal',
                    weight: '400'
                }
            );

            notoFont.load().then(function(font) {
                document.fonts.add(font);
                document.documentElement.classList.add('fonts-loaded');
            }).catch(function() {
                // フォント読み込み失敗時のフォールバック
                document.documentElement.classList.add('fonts-failed');
            });
        }
    }

    /**
     * レイアウトシフト防止のためのプレースホルダー設定
     */
    function preventLayoutShift() {
        // 画像のアスペクト比保持
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const width = img.getAttribute('width');
            const height = img.getAttribute('height');
            
            if (width && height) {
                const aspectRatio = (height / width) * 100;
                img.style.aspectRatio = `${width} / ${height}`;
                img.style.width = '100%';
                img.style.height = 'auto';
            }
        });

        // コンテンツのmin-height設定
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = '100vh';
        }
    }

    /**
     * Above the Fold 要素の早期表示
     */
    function showAboveFoldContent() {
        // ヒーローセクションの即座表示
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }

        // ナビゲーションの表示
        const navigation = document.querySelector('.navigation');
        if (navigation) {
            navigation.style.opacity = '1';
        }

        // プロフィール画像の表示優先度
        const profileImg = document.querySelector('.profile-image');
        if (profileImg) {
            profileImg.loading = 'eager';
            profileImg.decoding = 'sync';
        }
    }

    /**
     * ビューポート検出とモバイル最適化
     */
    function optimizeForViewport() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        document.documentElement.classList.toggle('is-mobile', isMobile);
        document.documentElement.classList.toggle('is-tablet', isTablet);
        document.documentElement.classList.toggle('is-desktop', !isMobile && !isTablet);

        // モバイルでのタッチ最適化
        if (isMobile) {
            document.documentElement.style.setProperty('-webkit-tap-highlight-color', 'transparent');
            document.documentElement.style.setProperty('touch-action', 'manipulation');
        }
    }

    /**
     * Core Web Vitals 改善のための初期設定
     */
    function initWebVitals() {
        // LCP要素の特定と最適化
        const lcpCandidates = document.querySelectorAll('.hero, .hero-image, h1');
        lcpCandidates.forEach(element => {
            element.style.contain = 'layout style paint';
        });

        // FID改善のためのメインスレッド解放
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // 重要でない処理を遅延実行
                console.log('Critical JavaScript loaded');
            });
        }
    }

    /**
     * セキュリティ強化（Critical）
     */
    function applyCriticalSecurity() {
        // 基本的なCSP違反監視
        document.addEventListener('securitypolicyviolation', function(e) {
            console.warn('CSP Violation:', e.violatedDirective, e.blockedURI);
        });

        // 外部リンクのセキュリティ
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="kei-adachi0709.github.io"])');
        externalLinks.forEach(link => {
            if (!link.rel.includes('noopener')) {
                link.rel += ' noopener noreferrer';
            }
        });
    }

    /**
     * エラーハンドリング
     */
    function setupErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('Critical script error:', e.error);
            
            // 重要なエラーのフォールバック処理
            if (e.error && e.error.message.includes('critical')) {
                // クリティカルな機能の代替実装
                document.documentElement.classList.add('js-error');
            }
        });

        window.addEventListener('unhandledrejection', function(e) {
            console.error('Critical promise rejection:', e.reason);
        });
    }

    /**
     * 初期化実行
     */
    function initCritical() {
        try {
            ensureCriticalCSS();
            optimizeFontLoading();
            preventLayoutShift();
            showAboveFoldContent();
            optimizeForViewport();
            initWebVitals();
            applyCriticalSecurity();
            setupErrorHandling();

            // クリティカル処理完了の記録
            const criticalEndTime = performance.now();
            window.criticalLoadTime = criticalEndTime - criticalStartTime;
            
            document.documentElement.classList.add('critical-loaded');
            
            // カスタムイベント発火
            document.dispatchEvent(new CustomEvent('criticalLoaded', {
                detail: { loadTime: window.criticalLoadTime }
            }));

        } catch (error) {
            console.error('Critical initialization failed:', error);
            document.documentElement.classList.add('critical-error');
        }
    }

    /**
     * DOM準備完了時に実行
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCritical);
    } else {
        initCritical();
    }

    /**
     * リサイズイベントの最適化
     */
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(optimizeForViewport, 150);
    }, { passive: true });

})();

/**
 * Critical CSS の非同期読み込みヘルパー
 */
window.loadCSS = function(href, before, media, callback) {
    var doc = window.document;
    var ss = doc.createElement("link");
    var ref;
    if (before) {
        ref = before;
    } else {
        var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
        ref = refs[refs.length - 1];
    }

    var sheets = doc.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    ss.media = "only x";

    function ready(cb) {
        if (doc.body) {
            return cb();
        }
        setTimeout(function() {
            ready(cb);
        });
    }

    ready(function() {
        ref.parentNode.insertBefore(ss, (before ? ref : ref.nextSibling));
    });

    var onloadcssdefined = function(cb) {
        var resolvedHref = ss.href;
        var i = sheets.length;
        while (i--) {
            if (sheets[i].href === resolvedHref) {
                return cb();
            }
        }
        setTimeout(function() {
            onloadcssdefined(cb);
        });
    };

    function loadCB() {
        if (ss.addEventListener) {
            ss.removeEventListener("load", loadCB);
        }
        ss.media = media || "all";
        if (callback) {
            callback();
        }
    }

    if (ss.addEventListener) {
        ss.addEventListener("load", loadCB);
    }
    ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined(loadCB);
    return ss;
};

// グローバルパフォーマンス情報をエクスポート
window.CriticalPerf = {
    startTime: performance.now(),
    loadTime: null,
    getMetrics: function() {
        return {
            criticalLoadTime: window.criticalLoadTime,
            domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            firstPaint: performance.getEntriesByType('paint')[0]?.startTime,
            firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime
        };
    }
};
