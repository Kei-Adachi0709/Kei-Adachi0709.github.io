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
    }, 1000);
});

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

// ===== ダークモード機能 =====
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

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
        document.body.classList.toggle('dark-theme');
        
        themeButton.classList.toggle('ri-sun-line');
        themeButton.classList.toggle('ri-moon-line');
        
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
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

// ===== コンタクトフォーム処理 =====
function initContactForm() {
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // フォームデータの取得
    const formData = new FormData(e.target);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const project = document.getElementById('project').value;
    const message = document.getElementById('message').value;
    
    // 簡単なバリデーション
    if (!name || !email || !message) {
        alert('すべての必須フィールドを入力してください。');
        return;
    }
    
    // EmailJS や他のサービスとの統合はPhase 3で実装予定
    alert('メッセージが送信されました！（実際の送信機能はPhase 3で実装予定）');
    
    // フォームリセット
    e.target.reset();
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

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    
    // パフォーマンス監視（開発環境のみ）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        monitorPerformance();
    }
    
    // アニメーション対象要素を監視
    const animateElements = document.querySelectorAll('[data-aos]');
    animateElements.forEach(el => {
        animationObserver.observe(el);
    });
    
    console.log('Portfolio site Phase 2 initialized successfully');
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
