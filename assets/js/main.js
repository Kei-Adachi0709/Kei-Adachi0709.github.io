/*===== メイン JavaScript ファイル =====*/

// ===== DOM要素の取得 =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const themeButton = document.getElementById('theme-button');
const scrollUp = document.getElementById('scroll-up');
const pageLoader = document.getElementById('page-loader');

// ===== ページローダー =====
window.addEventListener('load', () => {
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add('hide');
        }
    }, 500);
});

// ===== モバイルメニューの表示/非表示 =====
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        // アクセシビリティ：フォーカス管理
        if (navClose) {
            navClose.focus();
        }
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        // アクセシビリティ：フォーカスを元に戻す
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
        
        // スムーススクロール（フォールバック）
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
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

// ===== スクロール時のヘッダー背景変更 =====
function scrollHeader() {
    if (window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

// ===== アクティブセクションの検出 =====
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
    if (window.scrollY >= 560) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

// ===== ダークモード機能 =====
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// 現在のテーマを取得する関数
const getCurrentTheme = () => document.body.classList.contains('dark-theme') ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains('ri-moon-line') ? 'ri-moon-line' : 'ri-sun-line';

// 保存されたテーマがあれば適用
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove']('dark-theme');
    if (themeButton) {
        themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove']('ri-moon-line');
        themeButton.classList[selectedIcon === 'ri-sun-line' ? 'add' : 'remove']('ri-sun-line');
    }
}

// テーマ切り替えボタンのイベントリスナー
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // ダークテーマの切り替え
        document.body.classList.toggle('dark-theme');
        
        // アイコンの切り替え
        themeButton.classList.toggle('ri-sun-line');
        themeButton.classList.toggle('ri-moon-line');
        
        // テーマをローカルストレージに保存
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}

// ===== Intersection Observer（パフォーマンス最適化） =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// アニメーション用のIntersection Observer
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('[data-aos]');
    animateElements.forEach(el => {
        animationObserver.observe(el);
    });
});

// ===== スクロールイベントの最適化（throttle使用） =====
let ticking = false;

function updateScrollEffects() {
    scrollHeader();
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

// ===== AOS（Animate On Scroll）初期化 =====
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

// ===== Typed.js初期化（Phase 2で使用予定） =====
function initTyped() {
    if (typeof Typed !== 'undefined') {
        const typedElement = document.querySelector('.typed');
        if (typedElement) {
            new Typed('.typed', {
                strings: [
                    'フロントエンド開発者',
                    'Webアプリケーション開発者',
                    'UI/UXデザイナー'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }
    }
}

// ===== Swiper初期化（Phase 2で使用予定） =====
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        // プロジェクトスライダー
        new Swiper('.projects-swiper', {
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
}

// ===== ユーティリティ関数 =====

// デバウンス関数
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

// スロットル関数
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

// 要素が表示領域にあるかチェック
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== フォーム処理（Phase 2で実装予定） =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    // フォーム送信処理（Phase 2で実装）
    console.log('フォーム送信処理（Phase 2で実装予定）');
}

// ===== パフォーマンス監視 =====
function monitorPerformance() {
    // Web Vitals監視（オプション）
    if ('performance' in window) {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FID (First Input Delay)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({ entryTypes: ['first-input'] });
    }
}

// ===== エラーハンドリング =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // エラーレポートサービスにログ送信（本番環境では実装）
});

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    // 基本機能の初期化
    initContactForm();
    
    // パフォーマンス監視（開発環境のみ）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        monitorPerformance();
    }
    
    console.log('Portfolio site initialized successfully');
});

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
