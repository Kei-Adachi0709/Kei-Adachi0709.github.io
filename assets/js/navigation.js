// ナビゲーション機能の改善

document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューの制御
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // メニューを表示
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // メニューを非表示
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // ナビゲーションリンクをクリックした時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // スクロール時のヘッダー背景変更
    const header = document.getElementById('header');
    
    function scrollHeader() {
        if (window.scrollY >= 80) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
    
    window.addEventListener('scroll', scrollHeader);

    // アクティブリンクの設定
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
            } else {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);

    // スキルセクションのアコーディオン機能
    const skillsHeaders = document.querySelectorAll('.skills__header');
    
    skillsHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const skillsContent = header.parentNode;
            const isOpen = skillsContent.classList.contains('skills__open');
            
            // 全てのスキルセクションを閉じる
            document.querySelectorAll('.skills__content').forEach(content => {
                content.classList.remove('skills__open');
                content.classList.add('skills__close');
            });
            
            // クリックされたセクションを開く（既に開いていた場合は閉じる）
            if (!isOpen) {
                skillsContent.classList.add('skills__open');
                skillsContent.classList.remove('skills__close');
            }
        });
    });

    // Qualification タブ機能
    const qualificationTabs = document.querySelectorAll('[data-target]');
    const qualificationContents = document.querySelectorAll('[data-content]');
    
    qualificationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.target);
            
            // 全てのタブを非アクティブにする
            qualificationContents.forEach(content => {
                content.classList.remove('qualification__active');
            });
            qualificationTabs.forEach(tabItem => {
                tabItem.classList.remove('qualification__active');
            });
            
            // クリックされたタブをアクティブにする
            target.classList.add('qualification__active');
            tab.classList.add('qualification__active');
        });
    });

    // スクロールアップボタン
    const scrollUp = document.getElementById('scroll-up');
    
    function scrollUpShow() {
        if (window.scrollY >= 560) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }
    
    window.addEventListener('scroll', scrollUpShow);

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ダークモード切り替え
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'ri-sun-line';

    // 保存されたテーマを取得
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    // 現在のテーマを取得
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

    // 保存されたテーマを適用
    if (selectedTheme) {
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
    }

    // テーマ切り替えボタンのクリックイベント
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle(darkTheme);
            themeButton.classList.toggle(iconTheme);
            
            // テーマ設定を保存
            localStorage.setItem('selected-theme', getCurrentTheme());
            localStorage.setItem('selected-icon', getCurrentIcon());
        });
    }

    // Intersection Observer でアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

// ユーティリティ関数
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

// パフォーマンス最適化されたスクロールイベント
const optimizedScrollHandler = debounce(() => {
    scrollHeader();
    scrollActive();
    scrollUpShow();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
