// note.com風UI機能統合ファイル

document.addEventListener('DOMContentLoaded', function() {
    // スクロール状態をクリア（バグ修正の安全措置）
    document.body.classList.remove('note-modal-open');
    
    initSkillTabs();
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initPortfolioModals();
});

// スキルタブ機能
function initSkillTabs() {
    const tabs = document.querySelectorAll('.note-skill-tab');
    const contents = document.querySelectorAll('.note-skill-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // すべてのタブとコンテンツの active クラスを削除
            tabs.forEach(t => t.classList.remove('note-skill-tab--active'));
            contents.forEach(c => c.classList.remove('note-skill-content--active'));
            
            // クリックされたタブと対応するコンテンツにactiveクラスを追加
            tab.classList.add('note-skill-tab--active');
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('note-skill-content--active');
            }
        });
    });
}

// モバイルメニュー機能
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.note-nav__mobile-link');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('note-nav__mobile-menu--open');
            mobileToggle.classList.toggle('active');
        });
        
        // モバイルリンククリック時にメニューを閉じる
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('note-nav__mobile-menu--open');
                mobileToggle.classList.remove('active');
            });
        });
        
        // メニュー外クリック時に閉じる
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('note-nav__mobile-menu--open');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// スムーススクロール
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.note-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // ナビゲーションのactive状態を更新
                updateActiveNavLink(targetId);
            }
        });
    });
}

// アクティブナビゲーションリンクの更新
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.note-nav__link');
    navLinks.forEach(link => {
        link.classList.remove('note-nav__link--active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('note-nav__link--active');
        }
    });
}

// スクロールイベントでナビゲーションの状態を更新
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.note-header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionHeight = section.offsetHeight;
        const scrollTop = window.scrollY;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${section.id}`);
        }
    });
});

// アニメーション機能
function initAnimations() {
    // AOS (Animate On Scroll) 初期化
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true,
            easing: 'ease-out-cubic'
        });
    }
    
    // スクロールトップボタン
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ポートフォリオモーダル機能
function initPortfolioModals() {
    // ポートフォリオカードのクリックイベントを設定
    document.addEventListener('click', (e) => {
        const portfolioCard = e.target.closest('.note-portfolio-card');
        if (portfolioCard) {
            e.preventDefault();
            const projectId = parseInt(portfolioCard.dataset.projectId);
            openPortfolioModal(projectId);
        }
    });
    
    // モーダル閉じるイベント（イベント委譲で重複を防ぐ）
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('note-modal__overlay') || 
            e.target.classList.contains('note-modal__close') ||
            e.target.closest('.note-modal__close')) {
            e.preventDefault();
            closePortfolioModal();
        }
    });
    
    // ESCキーでモーダルを閉じる（既存のモーダルがある場合のみ）
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.note-modal')) {
            e.preventDefault();
            closePortfolioModal();
        }
    });
    
    // ページ遷移時やリロード時にスクロールを強制的に有効化
    window.addEventListener('beforeunload', () => {
        document.body.classList.remove('note-modal-open');
    });
    
    // モーダル外のクリックでも閉じる（追加の安全措置）
    document.addEventListener('click', (e) => {
        const modal = document.querySelector('.note-modal');
        if (modal && !e.target.closest('.note-modal__content') && e.target.classList.contains('note-modal__overlay')) {
            closePortfolioModal();
        }
    });
}

// ポートフォリオモーダルを開く
function openPortfolioModal(projectId) {
    // portfolio-data.jsからプロジェクトデータを取得
    const project = window.portfolioData?.find(p => p.id === projectId);
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }
    
    // 既存のモーダルがある場合は先に閉じる
    closePortfolioModal();
    
    // 現在のスクロール位置を保存
    const scrollY = window.scrollY;
    
    // モーダルHTML生成
    const modalHTML = createPortfolioModalHTML(project);
    
    // モーダルをボディに追加
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement.firstElementChild);
    
    // スクロール無効化と位置固定
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('note-modal-open');
    document.body.setAttribute('data-scroll-y', scrollY);
    
    // アニメーション
    setTimeout(() => {
        const modal = document.querySelector('.note-modal');
        if (modal) {
            modal.classList.add('note-modal--open');
        }
    }, 10);
}

// ポートフォリオモーダルを閉じる
function closePortfolioModal() {
    const modal = document.querySelector('.note-modal');
    
    // スクロール位置の復元
    const scrollY = document.body.getAttribute('data-scroll-y') || '0';
    
    // モーダルクラスを削除
    document.body.classList.remove('note-modal-open');
    document.body.classList.add('note-scroll-restored');
    document.body.style.top = '';
    document.body.removeAttribute('data-scroll-y');
    
    // スクロール位置を復元
    window.scrollTo(0, parseInt(scrollY));
    
    // 補助クラスを削除
    setTimeout(() => {
        document.body.classList.remove('note-scroll-restored');
    }, 100);
    
    if (modal) {
        modal.classList.remove('note-modal--open');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ポートフォリオモーダルHTML生成
function createPortfolioModalHTML(project) {
    return `
        <div class="note-modal">
            <div class="note-modal__overlay">
                <div class="note-modal__content">
                    <div class="note-modal__header">
                        <button class="note-modal__close" aria-label="閉じる">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    
                    <div class="note-modal__body">
                        <div class="note-portfolio-detail">
                            <div class="note-portfolio-detail__image">
                                <img src="${project.image}" alt="${project.title}" class="note-portfolio-detail__img">
                            </div>
                            
                            <div class="note-portfolio-detail__content">
                                <h2 class="note-portfolio-detail__title">${project.title}</h2>
                                
                                <div class="note-portfolio-detail__meta">
                                    <div class="note-meta-item">
                                        <i class="ri-calendar-line"></i>
                                        <span>制作期間: ${project.period}</span>
                                    </div>
                                    <div class="note-meta-item">
                                        <i class="ri-team-line"></i>
                                        <span>制作人数: ${project.members}人</span>
                                    </div>
                                </div>
                                
                                <div class="note-portfolio-detail__technologies">
                                    ${project.technologies.map(tech => 
                                        `<span class="note-tech-tag">${tech}</span>`
                                    ).join('')}
                                </div>
                                
                                <div class="note-portfolio-detail__description">
                                    ${project.detailedDescription || project.description}
                                </div>
                                
                                ${createPortfolioLinks(project.links)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ポートフォリオリンク生成
function createPortfolioLinks(links) {
    if (!links) return '';
    
    return `
        <div class="note-portfolio-detail__links">
            <h3 class="note-portfolio-detail__links-title">関連リンク</h3>
            <div class="note-portfolio-detail__link-cards">
                ${links.protopedia ? `
                    <a href="${links.protopedia.url}" target="_blank" class="note-link-card">
                        <div class="note-link-card__favicon">
                            <img src="${links.protopedia.favicon}" alt="ProtoPedia">
                        </div>
                        <div class="note-link-card__content">
                            <h4 class="note-link-card__title">${links.protopedia.title}</h4>
                            <p class="note-link-card__description">${links.protopedia.description.substring(0, 100)}...</p>
                            <span class="note-link-card__url">protopedia.net</span>
                        </div>
                        <div class="note-link-card__icon">
                            <i class="ri-external-link-line"></i>
                        </div>
                    </a>
                ` : ''}
                
                ${links.github ? `
                    <a href="${links.github.url}" target="_blank" class="note-link-card">
                        <div class="note-link-card__favicon">
                            <img src="${links.github.favicon}" alt="GitHub">
                        </div>
                        <div class="note-link-card__content">
                            <h4 class="note-link-card__title">${links.github.title}</h4>
                            <p class="note-link-card__description">${links.github.description.substring(0, 100)}...</p>
                            <span class="note-link-card__url">github.com</span>
                        </div>
                        <div class="note-link-card__icon">
                            <i class="ri-external-link-line"></i>
                        </div>
                    </a>
                ` : ''}
                
                ${links.demo ? `
                    <a href="${links.demo.url}" target="_blank" class="note-link-card">
                        <div class="note-link-card__favicon">
                            <img src="${links.demo.favicon}" alt="Demo">
                        </div>
                        <div class="note-link-card__content">
                            <h4 class="note-link-card__title">${links.demo.title}</h4>
                            <p class="note-link-card__description">${links.demo.description.substring(0, 100)}...</p>
                            <span class="note-link-card__url">デモサイト</span>
                        </div>
                        <div class="note-link-card__icon">
                            <i class="ri-external-link-line"></i>
                        </div>
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

// テーマ切替機能
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // 保存されたテーマを読み込み
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// パフォーマンス最適化
function initPerformanceOptimizations() {
    // 画像の遅延読み込み
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // リンクのプリフェッチ
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
        }, { once: true });
    });
}

// フォーム機能（Contact用）
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // 送信中の状態
            submitButton.textContent = '送信中...';
            submitButton.disabled = true;
            
            try {
                // ここでフォーム送信処理を実装
                console.log('Form submitted:', Object.fromEntries(formData));
                
                // 成功メッセージ
                showNotification('メッセージが送信されました！', 'success');
                contactForm.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('送信に失敗しました。再度お試しください。', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// 通知機能
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `note-notification note-notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // アニメーション
    setTimeout(() => {
        notification.classList.add('note-notification--show');
    }, 10);
    
    // 自動削除
    setTimeout(() => {
        notification.classList.remove('note-notification--show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 初期化完了後の処理
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initPerformanceOptimizations();
    initContactForm();
    
    // ページロード完了をマーク
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
