/**
 * 統合されたメインJavaScriptファイル
 * note.com風ポートフォリオサイト
 */

// ==========================================================================
// 1. スクロール制御（scroll-fix.jsから移行）
// ==========================================================================

class ScrollController {
    constructor() {
        this.isScrollDisabled = false;
        this.scrollPosition = 0;
        this.init();
    }

    init() {
        this.forceResetScroll();
    }

    forceResetScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        document.body.classList.remove('note-modal-open', 'scroll-disabled', 'no-scroll');
        document.documentElement.classList.remove('note-modal-open', 'scroll-disabled', 'no-scroll');
        
        document.body.removeAttribute('data-scroll-y');
        document.body.removeAttribute('data-scroll-locked');
        
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        
        this.isScrollDisabled = false;
        this.scrollPosition = 0;
    }

    disableScroll() {
        if (this.isScrollDisabled) return;

        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.style.left = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        
        document.documentElement.style.overflow = 'hidden';
        document.body.classList.add('note-modal-open');
        document.body.setAttribute('data-scroll-y', this.scrollPosition.toString());
        
        this.isScrollDisabled = true;
    }

    enableScroll() {
        if (!this.isScrollDisabled) return;

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        document.documentElement.style.overflow = '';
        document.body.classList.remove('note-modal-open');
        document.body.removeAttribute('data-scroll-y');
        
        if (this.scrollPosition > 0) {
            window.scrollTo(0, this.scrollPosition);
            setTimeout(() => window.scrollTo(0, this.scrollPosition), 10);
        }
        
        this.isScrollDisabled = false;
        this.scrollPosition = 0;
    }
}

// グローバルスクロールコントローラー
window.scrollController = new ScrollController();

// ==========================================================================
// 2. ポートフォリオデータ（portfolio-data-extended.jsから移行）
// ==========================================================================

const portfolioData = [
    {
        id: 1,
        title: "SmartPhoneSaber",
        category: ["app", "android"],
        image: "assets/images/projects/smartphone-saber-screenshot.jpg",
        description: "音楽に合わせてスマホを振って遊ぶエンターテインメントアプリ。運動不足解消と家庭間コミュニケーション促進を目的としたレクリエーションツール。",
        detailedDescription: "SmartPhoneSaberは、スマートフォンのモーションセンサーを活用したエンターテインメントアプリです。音楽に合わせてスマートフォンを剣のように振ることで、家族間のコミュニケーションと運動不足解消を同時に実現します。",
        technologies: ["Android Studio", "Java", "Motion Sensor", "Audio Processing"],
        period: "2023年5月〜7月",
        members: 1,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/4730",
                title: "SmartPhoneSaber - ProtoPedia",
                description: "スマートフォンを使った革新的なエンターテインメントアプリ",
                favicon: "/assets/images/favicons/protopedia.png"
            }
        }
    },
    {
        id: 2,
        title: "スマートお迎え",
        category: ["app", "android"],
        image: "assets/images/projects/smart-pickup-parent.jpg",
        description: "保護者が保育園に近づくと自動で通知するアプリ。Wi-Fi SSID検知により、お迎え時間短縮と駐車場混雑緩和を実現。",
        detailedDescription: "スマートお迎えは、保育園での待ち時間を短縮し、駐車場の混雑を緩和するためのスマートアプリです。Wi-Fi SSID検知技術を使用して、保護者が保育園に近づくと自動的に通知を送信します。",
        technologies: ["Android Studio", "Wi-Fi API", "WebSocket", "QR Code"],
        period: "2023年5月〜7月",
        members: 1,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/4731",
                title: "スマートお迎え - ProtoPedia",
                description: "保育園のお迎えを効率化するスマートソリューション",
                favicon: "/assets/images/favicons/protopedia.png"
            }
        }
    },
    {
        id: 3,
        title: "QR食品表示",
        category: ["web", "fullstack"],
        image: "assets/images/projects/qr-food-customer.jpg",
        description: "飲食店向け食品情報表示システム。QRコードでアレルゲン・原材料情報を簡単確認でき、多言語対応でアクセシビリティを向上。",
        detailedDescription: "QR食品表示は、飲食店における食品アレルギー対策とアクセシビリティ向上のためのWebアプリケーションです。QRコードをスキャンするだけで、料理の詳細情報、アレルゲン、原材料を多言語で確認できます。",
        technologies: ["HTML5", "PHP", "MySQL", "QR Code"],
        period: "2023年11月〜2024年1月",
        members: 1,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/5781",
                title: "QR食品表示 - ProtoPedia",
                description: "飲食店向け食品情報表示システム",
                favicon: "/assets/images/favicons/protopedia.png"
            },
            github: {
                url: "https://github.com/Kei-Adachi0709/QR-Allergy-Guide",
                title: "QR-Allergy-Guide - GitHub",
                description: "オープンソースの食品アレルギー対策ソリューション",
                favicon: "/assets/images/favicons/github.png"
            }
        }
    },
    {
        id: 4,
        title: "AWS インフラ構築プロジェクト",
        category: ["infrastructure", "aws", "devops"],
        image: "assets/images/projects/aws-infrastructure.jpg",
        description: "Terraformを使用してAWS上にスケーラブルなインフラを構築。ALB、Auto Scaling、RDS、ElastiCacheを組み合わせた高可用性アーキテクチャを実装。",
        detailedDescription: "AWS上でTerraformを使用してスケーラブルで高可用性なインフラストラクチャを構築しました。Application Load Balancer、Auto Scaling Group、RDS、ElastiCacheを組み合わせたモダンなアーキテクチャを実装し、DevOpsのベストプラクティスを適用しています。",
        technologies: ["Terraform", "AWS", "ALB", "RDS", "Auto Scaling"],
        period: "2024年3月",
        members: 1,
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/aws-terraform-infrastructure",
                title: "AWS Terraform Infrastructure - GitHub",
                description: "TerraformによるAWSインフラ自動化プロジェクト",
                favicon: "/assets/images/favicons/github.png"
            }
        }
    },
    {
        id: 5,
        title: "Kubernetes デプロイメント",
        category: ["infrastructure", "kubernetes", "devops"],
        image: "assets/images/projects/kubernetes-dashboard.jpg",
        description: "Kubernetesを使用したマイクロサービスアーキテクチャの実装。Helm、Ingress Controller、Prometheus/Grafanaによる監視体制も構築。",
        detailedDescription: "Kubernetesクラスタ上でマイクロサービスアーキテクチャを実装しました。Helmチャートによるデプロイメント管理、Ingress Controllerによるトラフィック制御、PrometheusとGrafanaによる包括的な監視システムを構築しています。",
        technologies: ["Kubernetes", "Docker", "Helm", "Prometheus", "Grafana"],
        period: "2024年2月",
        members: 1,
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/k8s-microservices",
                title: "Kubernetes Microservices - GitHub",
                description: "Kubernetesベースのマイクロサービス実装",
                favicon: "/assets/images/favicons/github.png"
            }
        }
    },
    {
        id: 6,
        title: "CI/CD パイプライン",
        category: ["devops", "cicd", "automation"],
        image: "assets/images/projects/cicd-pipeline.jpg",
        description: "GitHub Actionsを使用したCI/CDパイプライン構築。コードプッシュから本番デプロイまでを自動化し、テスト・セキュリティチェック・Dockerイメージビルドを含む完全自動化を実現。",
        detailedDescription: "GitHub Actionsを使用してコードプッシュから本番環境へのデプロイまでを完全自動化するCI/CDパイプラインを構築しました。自動テスト、セキュリティスキャン、Dockerイメージのビルドとデプロイ、ロールバック機能を含む包括的なDevOpsワークフローを実装しています。",
        technologies: ["GitHub Actions", "Docker", "SonarQube", "AWS ECR"],
        period: "2024年1月",
        members: 1,
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/cicd-pipeline-template",
                title: "CI/CD Pipeline Template - GitHub",
                description: "GitHub Actionsによる完全自動化CI/CDパイプライン",
                favicon: "/assets/images/favicons/github.png"
            }
        }
    }
];

// グローバルに公開
window.portfolioData = portfolioData;

// ==========================================================================
// 3. メインアプリケーション（note-app.jsから移行・統合）
// ==========================================================================

class NotePortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });
    }

    initializeComponents() {
        this.initSkillTabs();
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initPortfolioModals();
        this.initPortfolioFilters();
        this.initExperienceTabs();
        this.initScrollTop();
        
        // ページ読み込み完了
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    }

    // スキルタブ機能
    initSkillTabs() {
        const tabs = document.querySelectorAll('.note-skill-tab');
        const contents = document.querySelectorAll('.note-skill-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (document.body.classList.contains('note-modal-open')) return;
                
                const targetTab = tab.dataset.tab;
                
                tabs.forEach(t => t.classList.remove('note-skill-tab--active'));
                contents.forEach(c => c.classList.remove('note-skill-content--active'));
                
                tab.classList.add('note-skill-tab--active');
                const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
                if (targetContent) {
                    targetContent.classList.add('note-skill-content--active');
                }
            });
        });
    }

    // モバイルメニュー機能
    initMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.note-nav__mobile-link');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('note-nav__mobile-menu--open');
                mobileToggle.classList.toggle('active');
            });
            
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('note-nav__mobile-menu--open');
                    mobileToggle.classList.remove('active');
                });
            });
            
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('note-nav__mobile-menu--open');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    }

    // スムーススクロール
    initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (document.body.classList.contains('note-modal-open')) return;
                
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.note-header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ポートフォリオモーダル機能
    initPortfolioModals() {
        document.addEventListener('click', (e) => {
            // 詳細を見るボタン
            if (e.target.closest('.note-portfolio-btn--view')) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                const viewBtn = e.target.closest('.note-portfolio-btn--view');
                const projectAttr = viewBtn.getAttribute('data-project');
                
                let projectId;
                if (projectAttr) {
                    const projectMap = {
                        'smartphone-saber': 1,
                        'smart-pickup': 2,
                        'qr-food-display': 3,
                        'aws-infrastructure': 4,
                        'kubernetes-deployment': 5,
                        'cicd-pipeline': 6
                    };
                    projectId = projectMap[projectAttr];
                } else {
                    const portfolioCard = e.target.closest('.note-portfolio-card');
                    if (portfolioCard) {
                        projectId = parseInt(portfolioCard.dataset.projectId);
                    }
                }
                
                if (projectId) {
                    this.openPortfolioModal(projectId);
                }
                return false;
            }
            
            // モーダル閉じる
            if (e.target.classList.contains('note-modal__overlay') || 
                e.target.classList.contains('note-modal__close') ||
                e.target.closest('.note-modal__close')) {
                e.preventDefault();
                e.stopPropagation();
                this.closePortfolioModal();
                return false;
            }
        }, true);
        
        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.note-modal');
                if (modal) {
                    e.preventDefault();
                    this.closePortfolioModal();
                }
            }
        });
    }

    // ポートフォリオモーダルを開く
    openPortfolioModal(projectId) {
        const project = portfolioData.find(p => p.id === projectId);
        if (!project) return;
        
        // 既存のモーダルを閉じる
        this.closePortfolioModal();
        
        // モーダルHTML生成
        const modalHTML = this.createPortfolioModalHTML(project);
        
        // モーダルをDOMに追加
        const modalElement = document.createElement('div');
        modalElement.innerHTML = modalHTML;
        const modalNode = modalElement.firstElementChild;
        document.body.appendChild(modalNode);
        
        // スクロール無効化
        window.scrollController.disableScroll();
        
        // アニメーション
        requestAnimationFrame(() => {
            const modal = document.querySelector('.note-modal');
            if (modal) {
                modal.classList.add('note-modal--open');
            }
        });
    }

    // ポートフォリオモーダルを閉じる
    closePortfolioModal() {
        const modal = document.querySelector('.note-modal');
        if (!modal) return;

        modal.classList.remove('note-modal--open');
        window.scrollController.enableScroll();
        
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    // モーダルHTML生成
    createPortfolioModalHTML(project) {
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
                                        ${project.detailedDescription}
                                    </div>
                                    
                                    ${this.createPortfolioLinks(project.links)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ポートフォリオリンク生成
    createPortfolioLinks(links) {
        if (!links) return '';
        
        return `
            <div class="note-portfolio-detail__links">
                <h3 class="note-portfolio-detail__links-title">関連リンク</h3>
                <div class="note-portfolio-detail__link-cards">
                    ${links.protopedia ? `
                        <a href="${links.protopedia.url}" target="_blank" class="note-link-card">
                            <div class="note-link-card__content">
                                <h4 class="note-link-card__title">${links.protopedia.title}</h4>
                                <p class="note-link-card__description">${links.protopedia.description}</p>
                                <span class="note-link-card__url">protopedia.net</span>
                            </div>
                            <div class="note-link-card__icon">
                                <i class="ri-external-link-line"></i>
                            </div>
                        </a>
                    ` : ''}
                    
                    ${links.github ? `
                        <a href="${links.github.url}" target="_blank" class="note-link-card">
                            <div class="note-link-card__content">
                                <h4 class="note-link-card__title">${links.github.title}</h4>
                                <p class="note-link-card__description">${links.github.description}</p>
                                <span class="note-link-card__url">github.com</span>
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

    // ポートフォリオフィルター機能
    initPortfolioFilters() {
        const filterBtns = document.querySelectorAll('.note-filter-btn');
        const portfolioCards = document.querySelectorAll('.note-portfolio-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const filter = btn.dataset.filter;
                
                // アクティブボタンの更新
                filterBtns.forEach(b => b.classList.remove('note-filter-btn--active'));
                btn.classList.add('note-filter-btn--active');
                
                // カードのフィルタリング
                portfolioCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = '';
                    } else {
                        const categories = card.dataset.category.split(' ');
                        if (categories.includes(filter)) {
                            card.style.display = '';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // 職歴・資格タブ機能
    initExperienceTabs() {
        const certTabs = document.querySelectorAll('.note-cert-tab');
        const certContents = document.querySelectorAll('.note-cert-content');
        
        certTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetTab = tab.dataset.tab;
                
                certTabs.forEach(t => t.classList.remove('note-cert-tab--active'));
                certContents.forEach(c => c.classList.remove('note-cert-content--active'));
                
                tab.classList.add('note-cert-tab--active');
                const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
                if (targetContent) {
                    targetContent.classList.add('note-cert-content--active');
                }
            });
        });
    }

    // スクロールトップボタン
    initScrollTop() {
        const scrollTopBtn = document.getElementById('scroll-top');
        
        if (scrollTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('note-scroll-top--show');
                } else {
                    scrollTopBtn.classList.remove('note-scroll-top--show');
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
}

// アプリケーション初期化
const noteApp = new NotePortfolioApp();

// ==========================================================================
// 4. 軽量アナリティクス（必要最小限）
// ==========================================================================

class LightAnalytics {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackUserEngagement();
    }

    trackPageView() {
        this.events.push({
            type: 'page_view',
            timestamp: Date.now(),
            url: window.location.href
        });
    }

    trackUserEngagement() {
        // ポートフォリオカードクリック
        document.addEventListener('click', (e) => {
            if (e.target.closest('.note-portfolio-card')) {
                this.trackEvent('portfolio_card_view', {
                    project_id: e.target.closest('.note-portfolio-card').dataset.projectId
                });
            }
            
            if (e.target.closest('.note-portfolio-btn--demo, .note-portfolio-btn--github')) {
                this.trackEvent('external_link_click', {
                    link_type: e.target.closest('.note-portfolio-btn--demo') ? 'demo' : 'github'
                });
            }
        });
        
        // スクロール深度
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) {
                    this.trackEvent('scroll_depth', { percent: maxScroll });
                }
            }
        });
    }

    trackEvent(eventName, params = {}) {
        this.events.push({
            type: eventName,
            timestamp: Date.now(),
            params: params
        });
        
        // デバッグログ（本番では削除）
        console.log(`Analytics: ${eventName}`, params);
    }
}

// 軽量アナリティクス初期化
const analytics = new LightAnalytics();
