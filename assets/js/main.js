/*===== メイン JavaScript ファイル =====*/

// ===== DOM要素の取得 =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const themeButton = document.getElementById('theme-button');
const scrollUp = document.getElementById('scroll-up');
// const pageLoader = document.getElementById('page-loader'); // 削除

// ===== ページローダー関連コードを削除 =====
// Loading画面で止まる問題を解決するため、ページローダー機能を完全に削除しました

// ===== モバイルメニューの表示/非表示 =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        if (navClose) {
            navClose.focus();
        }
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        if (navToggle) {
            navToggle.focus();
        }
    });
}

// ===== ナビゲーションリンククリック時の処理 =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // モバイルメニューを閉じる
        navMenu.classList.remove('show-menu');
        
        // アクティブリンクの切り替え
        navLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
    });
});

// ===== ESCキーでメニューを閉じる =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        if (navToggle) {
            navToggle.focus();
        }
    }
});

// ===== スクロール時のアクティブセクション検出 =====
function scrollActive() {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
        
        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.classList.add('active-link');
            } else {
                correspondingLink.classList.remove('active-link');
            }
        }
    });
}

// ===== スクロールアップボタンの表示/非表示 =====
function scrollUp() {
    const scrollUpElement = document.getElementById('scroll-up');
    if (scrollUpElement) {
        if (window.scrollY >= 560) {
            scrollUpElement.classList.add('show-scroll');
        } else {
            scrollUpElement.classList.remove('show-scroll');
        }
    }
}

// ===== セキュアなダークモード機能 =====
const selectedTheme = secureStorageGet('selected-theme');
const selectedIcon = secureStorageGet('selected-icon');

const getCurrentTheme = () => document.body.classList.contains('dark-theme') ? 'dark' : 'light';
const getCurrentIcon = () => themeButton?.classList.contains('ri-moon-line') ? 'ri-moon-line' : 'ri-sun-line';

// 保存されたテーマがあれば適用（セキュリティチェック付き）
if (selectedTheme && ['dark', 'light'].includes(selectedTheme)) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove']('dark-theme');
    if (themeButton && selectedIcon && ['ri-moon-line', 'ri-sun-line'].includes(selectedIcon)) {
        themeButton.classList.remove('ri-moon-line', 'ri-sun-line');
        themeButton.classList.add(selectedIcon);
    }
}

// テーマ切り替えボタンのイベントリスナー（セキュリティ強化）
if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        themeButton.classList.toggle('ri-sun-line');
        themeButton.classList.toggle('ri-moon-line');
        
        // セキュアなストレージ保存
        secureStorageSet('selected-theme', getCurrentTheme());
        secureStorageSet('selected-icon', getCurrentIcon());
    });
}

// ===== スキルアコーディオン =====
const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    const itemClass = this.parentNode.className;

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }
    
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

// ===== クオリフィケーションタブ =====
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });
        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        });
        tab.classList.add('qualification__active');
    });
});

// ===== Typed.js初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Typed !== 'undefined') {
        const typedElement = document.querySelector('.typed');
        if (typedElement) {
            new Typed('.typed', {
                strings: [
                    'Frontend Developer',
                    'UI/UX Designer',
                    'Web Developer'
                ],
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000,
                loop: true
            });
        }
    }
});

// ===== Swiper初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper !== 'undefined') {
        const portfolioSwiper = new Swiper('.portfolio__container', {
            cssMode: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            mousewheel: true,
            keyboard: true,
        });
    }
});

// ===== スムーススクロール効果の最適化 =====
let ticking = false;

function updateScrollEffects() {
    scrollActive();
    scrollUp();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// ===== AOS初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
});

// ===== セキュアなコンタクトフォーム処理 =====
function initContactForm() {
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        // セキュアなフォームハンドラーを使用
        new SecureFormHandler(contactForm);
    }
}

function handleFormSubmit(e) {
    // この関数は SecureFormHandler で置き換えられました
    // セキュリティ強化されたフォーム処理を使用
    console.log('Secure form processing handled by SecureFormHandler');
}

// ===== セキュアなDOM操作 =====
function secureUpdateContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element && SecurityUtils) {
        SecurityUtils.safeSetInnerHTML(element, content);
    }
}

// ===== セキュアな外部リンク処理 =====
function initSecureLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.href;
            
            if (SecurityUtils && SecurityUtils.isValidURL(url)) {
                SecurityUtils.openSafeURL(url);
            } else {
                console.warn('Blocked potentially unsafe URL:', url);
                SecurityUtils?.logSecurityEvent('BLOCKED_UNSAFE_URL', { url });
            }
        });
        
        // rel属性にnoopenerとnoreferrerを追加
        link.rel = 'noopener noreferrer';
    });
}

// ===== セキュアなローカルストレージ操作 =====
function secureStorageSet(key, value) {
    try {
        if (SecurityUtils) {
            const sanitizedKey = SecurityUtils.sanitizeHTML(key);
            const sanitizedValue = SecurityUtils.sanitizeHTML(value);
            localStorage.setItem(sanitizedKey, sanitizedValue);
        }
    } catch (error) {
        console.error('Secure storage error:', error);
        SecurityUtils?.logSecurityEvent('STORAGE_ERROR', { key, error: error.message });
    }
}

function secureStorageGet(key) {
    try {
        if (SecurityUtils) {
            const sanitizedKey = SecurityUtils.sanitizeHTML(key);
            return localStorage.getItem(sanitizedKey);
        }
    } catch (error) {
        console.error('Secure storage error:', error);
        SecurityUtils?.logSecurityEvent('STORAGE_ERROR', { key, error: error.message });
        return null;
    }
}

// ===== パフォーマンス監視 =====
function monitorPerformance() {
    if ('performance' in window && 'PerformanceObserver' in window) {
        // LCP監視
        try {
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('LCP:', entry.startTime);
                }
            }).observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.log('LCP monitoring not supported');
        }

        // FID監視
        try {
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            }).observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.log('FID monitoring not supported');
        }
    }
}

// ===== Intersection Observer（パフォーマンス最適化） =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// ===== エラーハンドリング =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// ===== ユーティリティ関数 =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== セキュリティ強化された初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    // セキュリティユーティリティの初期化を待つ
    if (typeof SecurityUtils !== 'undefined') {
        // セキュアなフォーム初期化
        initContactForm();
        
        // セキュアなリンク処理
        initSecureLinks();
        
        // パフォーマンス監視（開発環境のみ）
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            monitorPerformance();
        }
        
        // アニメーション対象要素を監視
        const animateElements = document.querySelectorAll('[data-aos]');
        animateElements.forEach(el => {
            animationObserver.observe(el);
        });
          console.log('Portfolio site Phase 3 (Security) initialized successfully');
        
        // セキュリティテストUI初期化
        initSecurityTestUI();
    } else {
        console.error('Security utilities not loaded');
    }
});

// ===== セキュリティテストUI初期化 =====
function initSecurityTestUI() {
    const runTestButton = document.getElementById('runSecurityTest');
    const benchmarkButton = document.getElementById('runBenchmark');
    const consoleElement = document.getElementById('securityConsole');
    const scoreElement = document.getElementById('scoreNumber');
    const recommendationsElement = document.getElementById('securityRecommendations');
    const recommendationsList = document.getElementById('recommendationsList');
    
    if (runTestButton) {
        runTestButton.addEventListener('click', async () => {
            if (typeof SecurityTestSuite === 'undefined') {
                console.error('SecurityTestSuite not loaded');
                return;
            }
            
            // ボタンを無効化
            runTestButton.disabled = true;
            runTestButton.innerHTML = '<i class="ri-loader-4-line"></i> テスト実行中...';
            
            // コンソールをクリア
            consoleElement.innerHTML = '';
            
            // テストスイート実行
            const testSuite = new SecurityTestSuite();
            
            // カスタムログ関数でコンソールに出力
            const originalLog = console.log;
            console.log = (...args) => {
                originalLog(...args);
                logToSecurityConsole(args.join(' '));
            };
            
            try {
                await testSuite.runAllTests();
                logToSecurityConsole('✅ すべてのセキュリティテストが完了しました', 'success');
                
                // テスト結果の表示
                const passedTests = testSuite.passedTests;
                const totalTests = testSuite.passedTests + testSuite.failedTests;
                const successRate = Math.round((passedTests / totalTests) * 100);
                
                logToSecurityConsole(`📊 テスト結果: ${passedTests}/${totalTests} (${successRate}%)`, 'info');
                
            } catch (error) {
                logToSecurityConsole(`❌ テスト実行エラー: ${error.message}`, 'error');
            }
            
            // console.logを元に戻す
            console.log = originalLog;
            
            // ボタンを有効化
            runTestButton.disabled = false;
            runTestButton.innerHTML = '<i class="ri-play-circle-line"></i> セキュリティテスト実行';
        });
    }
    
    if (benchmarkButton) {
        benchmarkButton.addEventListener('click', async () => {
            if (typeof SecurityBenchmark === 'undefined') {
                console.error('SecurityBenchmark not loaded');
                return;
            }
            
            // ボタンを無効化
            benchmarkButton.disabled = true;
            benchmarkButton.innerHTML = '<i class="ri-loader-4-line"></i> 計測中...';
            
            try {
                const benchmark = SecurityBenchmark.calculateSecurityScore();
                
                // スコア表示のアニメーション
                animateScore(scoreElement, benchmark.score);
                
                // 推奨事項の表示
                if (benchmark.recommendation.length > 0) {
                    showRecommendations(recommendationsList, benchmark.recommendation);
                    recommendationsElement.style.display = 'block';
                } else {
                    recommendationsElement.style.display = 'none';
                }
                
                logToSecurityConsole(`🏆 セキュリティスコア: ${benchmark.score}/100`, 'success');
                
                // スコアが80未満の場合は警告
                if (benchmark.score < 80) {
                    logToSecurityConsole('⚠️ セキュリティスコアが低いです。改善提案を確認してください。', 'error');
                } else if (benchmark.score < 90) {
                    logToSecurityConsole('✨ 良好なセキュリティレベルです。', 'info');
                } else {
                    logToSecurityConsole('🛡️ 優秀なセキュリティレベルです！', 'success');
                }
                
            } catch (error) {
                logToSecurityConsole(`❌ ベンチマーク実行エラー: ${error.message}`, 'error');
            }
            
            // ボタンを有効化
            benchmarkButton.disabled = false;
            benchmarkButton.innerHTML = '<i class="ri-bar-chart-line"></i> セキュリティスコア計測';
        });
    }
}

// セキュリティコンソールにログを出力
function logToSecurityConsole(message, type = 'info') {
    const consoleElement = document.getElementById('securityConsole');
    if (!consoleElement) return;
    
    // プレースホルダーを削除
    const placeholder = consoleElement.querySelector('.security__console-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    const logLine = document.createElement('div');
    logLine.className = `security__console-line security__console-${type}`;
    logLine.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    
    consoleElement.appendChild(logLine);
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

// スコアアニメーション
function animateScore(element, targetScore) {
    if (!element) return;
    
    let currentScore = 0;
    const increment = targetScore / 30; // 30フレームでアニメーション
    
    const animation = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(animation);
        }
        element.textContent = Math.round(currentScore);
    }, 50);
}

// 推奨事項の表示
function showRecommendations(listElement, recommendations) {
    if (!listElement) return;
    
    listElement.innerHTML = '';
    recommendations.forEach(recommendation => {
        const li = document.createElement('li');
        li.textContent = recommendation;
        listElement.appendChild(li);
    });
}

// ===== サービスワーカー登録（PWA化の準備） =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
