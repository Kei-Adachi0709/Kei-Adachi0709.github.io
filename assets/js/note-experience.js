// ==========================================================================
// 職歴・資格セクション JavaScript
// Experience & Certifications Section Interactive Features
// ==========================================================================

/**
 * 職歴・資格セクションの初期化
 */
function initExperienceCertifications() {
    initCertificationTabs();
    initScrollAnimations();
    initHoverEffects();
}

/**
 * 資格タブの切り替え機能
 */
function initCertificationTabs() {
    const tabs = document.querySelectorAll('.note-cert-tab');
    const contents = document.querySelectorAll('.note-cert-content');
      tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // スクロール状態を保護（新しいScrollController使用）
            if (window.scrollController && window.scrollController.isScrollDisabled) {
                return;
            }
            
            const targetTab = tab.dataset.tab;
            
            // 全てのタブからアクティブクラスを削除
            tabs.forEach(t => t.classList.remove('note-cert-tab--active'));
            contents.forEach(c => c.classList.remove('note-cert-content--active'));
            
            // 選択されたタブをアクティブに
            tab.classList.add('note-cert-tab--active');
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('note-cert-content--active');
            }
            
            // アニメーション効果
            animateTabContent(targetContent);
        });
    });
}

/**
 * タブコンテンツのアニメーション
 * @param {HTMLElement} content - アニメーション対象の要素
 */
function animateTabContent(content) {
    if (!content) return;
    
    const cards = content.querySelectorAll('.note-cert-card');
    
    // 一旦透明にして、順番にフェードイン
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * スクロールアニメーションの初期化（強化版）
 */
function initScrollAnimations() {
    // Intersection Observer の設定
    const observerOptions = {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // アニメーションクラスを追加
                element.classList.add('note-animate-in');
                
                // タイムラインアイテムの場合
                if (element.classList.contains('note-timeline-item')) {
                    animateTimelineItem(element);
                }
                
                // 資格カードの場合
                if (element.classList.contains('note-cert-card')) {
                    animateCertCard(element);
                }
                
                // 段落的表示のトリガー
                if (element.classList.contains('note-experience-card')) {
                    animateExperienceCard(element);
                }
                
                // 一度アニメーションしたら監視を停止
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // 監視対象要素を追加
    const animationTargets = document.querySelectorAll(`
        .note-timeline-item,
        .note-cert-card,
        .note-experience-card,
        .note-section__header
    `);
    
    animationTargets.forEach(item => {
        observer.observe(item);
    });
    
    // スクロール連動エフェクト
    initScrollParallax();
}

/**
 * タイムラインアイテムのアニメーション
 * @param {HTMLElement} item - タイムラインアイテム
 */
function animateTimelineItem(item) {
    const card = item.querySelector('.note-experience-card');
    const marker = item.querySelector('.note-timeline-marker__dot');
    
    if (card) {
        card.style.transform = 'translateX(-20px)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.transform = 'translateX(0)';
            card.style.opacity = '1';
        }, 200);
    }
    
    if (marker) {
        marker.style.transform = 'scale(0)';
        setTimeout(() => {
            marker.style.transition = 'all 0.4s ease';
            marker.style.transform = 'scale(1)';
        }, 100);
    }
}

/**
 * 資格カードのアニメーション
 * @param {HTMLElement} card - 資格カード
 */
function animateCertCard(card) {
    card.style.transform = 'translateY(30px)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, Math.random() * 300 + 100);
}

/**
 * 職歴カードのアニメーション
 * @param {HTMLElement} card - 職歴カード要素
 */
function animateExperienceCard(card) {
    const elements = {
        header: card.querySelector('.note-experience-card__header'),
        description: card.querySelector('.note-experience-card__description'),
        achievements: card.querySelector('.note-experience-card__achievements'),
        technologies: card.querySelector('.note-experience-card__technologies'),
        actions: card.querySelector('.note-experience-card__actions')
    };
    
    // 順次アニメーション
    Object.values(elements).forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150 + 200);
        }
    });
    
    // 技術タグの個別アニメーション
    const techTags = card.querySelectorAll('.note-tech-tag');
    techTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.4s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, index * 80 + 800);
    });
}

/**
 * スクロール連動パララックス効果
 */
function initScrollParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // セクションヘッダーのパララックス
        const sectionHeaders = document.querySelectorAll('.note-section__header');
        sectionHeaders.forEach(header => {
            const rect = header.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                header.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // パフォーマンスを考慮してパララックスを制御
    const shouldUseParallax = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (shouldUseParallax) {
        window.addEventListener('scroll', requestTick);
    }
}

/**
 * 進行状況インジケーター
 */
function initProgressIndicator() {
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'note-scroll-progress';
        progressBar.innerHTML = '<div class="note-scroll-progress__bar"></div>';
        document.body.appendChild(progressBar);
        return progressBar;
    };
    
    const progressBar = createProgressBar();
    const progressBarFill = progressBar.querySelector('.note-scroll-progress__bar');
    
    function updateProgress() {
        const scrolled = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        
        progressBarFill.style.width = Math.min(progress, 100) + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // 初期実行
}

/**
 * スマートな読み込み時間表示
 */
function initSmartLoading() {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        
        // パフォーマンス情報を開発者コンソールに出力
        if (loadTime < 1000) {
            console.log(`✅ 職歴・資格セクション読み込み完了: ${loadTime.toFixed(2)}ms (高速)`);
        } else if (loadTime < 3000) {
            console.log(`⚠️ 職歴・資格セクション読み込み完了: ${loadTime.toFixed(2)}ms (普通)`);
        } else {
            console.log(`🐌 職歴・資格セクション読み込み完了: ${loadTime.toFixed(2)}ms (要最適化)`);
        }
    });
}

/**
 * 詳細表示トグル機能（改良版）
 */
function initDetailToggle() {
    const detailButtons = document.querySelectorAll('.note-detail-toggle');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const isExpanded = targetElement.classList.contains('note-expanded');
                
                if (isExpanded) {
                    // 閉じるアニメーション
                    targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
                    targetElement.offsetHeight; // リフロー強制
                    targetElement.classList.remove('note-expanded');
                    targetElement.style.maxHeight = '0px';
                    
                    button.setAttribute('aria-expanded', 'false');
                    button.innerHTML = '<i class="ri-add-line"></i> 詳細を見る';
                    
                    // アニメーション完了後にスタイルをリセット
                    setTimeout(() => {
                        targetElement.style.maxHeight = '';
                    }, 400);
                } else {
                    // 開くアニメーション
                    targetElement.classList.add('note-expanded');
                    targetElement.style.maxHeight = targetElement.scrollHeight + 'px';
                    
                    button.setAttribute('aria-expanded', 'true');
                    button.innerHTML = '<i class="ri-subtract-line"></i> 詳細を隠す';
                    
                    // メトリクスアニメーション
                    setTimeout(() => {
                        animateMetrics(targetElement);
                    }, 200);
                    
                    // アニメーション完了後にautoに設定
                    setTimeout(() => {
                        targetElement.style.maxHeight = 'none';
                    }, 400);
                }
                
                // スムーズスクロール
                if (!isExpanded) {
                    setTimeout(() => {
                        button.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }, 200);
                }
            }
        });
    });
}

/**
 * メトリクスのアニメーション
 * @param {HTMLElement} container - メトリクスを含む要素
 */
function animateMetrics(container) {
    const metrics = container.querySelectorAll('.note-metric-value');
    
    metrics.forEach((metric, index) => {
        const finalValue = metric.textContent;
        const isNumeric = /^\d+/.test(finalValue);
        
        if (isNumeric) {
            const numValue = parseInt(finalValue.match(/\d+/)[0]);
            animateCountUp(metric, 0, numValue, 1000 + (index * 200), finalValue.replace(/\d+/, ''));
        } else {
            // 非数値の場合は単純なフェードイン
            metric.style.opacity = '0';
            setTimeout(() => {
                metric.style.transition = 'opacity 0.6s ease';
                metric.style.opacity = '1';
            }, index * 200);
        }
    });
}

/**
 * カウントアップアニメーション
 * @param {HTMLElement} element - アニメーション対象要素
 * @param {number} start - 開始値
 * @param {number} end - 終了値
 * @param {number} duration - アニメーション時間
 * @param {string} suffix - 接尾辞
 */
function animateCountUp(element, start, end, duration, suffix = '') {
    const startTime = Date.now();
    const range = end - start;
    
    function updateValue() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数（ease-out）
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (range * easeOut));
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = end + suffix;
        }
    }
    
    updateValue();
}

/**
 * キーボードナビゲーション対応
 */
function initKeyboardNavigation() {
    const tabs = document.querySelectorAll('.note-cert-tab');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            let nextIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    nextIndex = (index + 1) % tabs.length;
                    tabs[nextIndex].click();
                    tabs[nextIndex].focus();
                    break;
                    
                case 'ArrowLeft':
                    e.preventDefault();
                    nextIndex = (index - 1 + tabs.length) % tabs.length;
                    tabs[nextIndex].click();
                    tabs[nextIndex].focus();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    tabs[0].click();
                    tabs[0].focus();
                    break;
                    
                case 'End':
                    e.preventDefault();
                    tabs[tabs.length - 1].click();
                    tabs[tabs.length - 1].focus();
                    break;
            }
        });
    });
}

/**
 * レスポンシブ対応
 */
function initResponsiveFeatures() {
    const handleResize = () => {
        const isMobile = window.innerWidth <= 768;
        const timeline = document.querySelector('.note-timeline');
        
        if (timeline) {
            if (isMobile) {
                timeline.classList.add('note-timeline--mobile');
            } else {
                timeline.classList.remove('note-timeline--mobile');
            }
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初期実行
}

/**
 * パフォーマンス最適化
 */
function optimizePerformance() {
    // 画像の遅延読み込み
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // アニメーションのパフォーマンス最適化
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        // アニメーションを無効化
        document.body.classList.add('note-reduced-motion');
    }
}

/**
 * DOMContentLoaded後の初期化（拡張版）
 */
document.addEventListener('DOMContentLoaded', () => {
    // 基本機能の初期化
    initExperienceCertifications();
    initDetailToggle();
    initKeyboardNavigation();
    initResponsiveFeatures();
    
    // パフォーマンス・UX機能
    optimizePerformance();
    initProgressIndicator();
    initSmartLoading();
    
    // 開発環境での追加情報
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.group('🚀 職歴・資格セクション初期化完了');
        console.log('📱 レスポンシブ機能: 有効');
        console.log('♿ アクセシビリティ機能: 有効');
        console.log('⚡ パフォーマンス最適化: 有効');
        console.log('🎨 アニメーション: 有効');
        console.groupEnd();
    }
});

/**
 * CSS変数の動的更新（テーマ切り替え用）
 */
function updateCSSVariables() {
    const root = document.documentElement;
    const isDark = document.body.classList.contains('dark-theme');
    
    if (isDark) {
        root.style.setProperty('--note-primary-color', '#6366f1');
        root.style.setProperty('--note-success-color', '#10b981');
        root.style.setProperty('--note-warning-color', '#f59e0b');
        root.style.setProperty('--note-danger-color', '#ef4444');
    }
}
