// ポートフォリオデータ管理ファイル
const portfolioData = [
    {
        id: 1,
        title: "SmartPhoneSaber",
        description: "音楽に合わせてスマホを振って遊ぶアプリです。スマホによる若者の運動不足を解消、そして家庭間のコミュニケーションを広げるためのレクリエーションツールとして使えるように制作した。",
        image: "https://protopedia.net/pic/ce6c7cec-88ae-423f-9287-abdd107d4cb7.jpg",
        technologies: ["Unity", "C#", "Android", "iOS"],
        period: "2023/05/01~2023/7/23",
        members: 3,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/4730",
                title: "SmartPhoneSaber | ProtoPedia",
                description: "音楽に合わせてスマホを振って遊ぶアプリです。スマホによる若者の運動不足を解消、そして家庭間のコミュニケーションを広げるためのレクリエーションツールとして使えるように制作した。",
                favicon: "https://protopedia.net/favicon.ico"
            }
        },
        category: "Mobile App",
        featured: true
    },
    {
        id: 2,
        title: "スマートお迎え",
        description: "保護者が保育園に近づいたら、保育園に保護者の接近を音声で通知するアプリ。これにより、児童が事前に帰宅の準備ができ、お迎えにかかる時間を短縮することができる。",
        image: "https://protopedia.net/pic/125642fa-8eac-4459-b095-16c3e1389b76.png",
        technologies: ["React Native", "Node.js", "Wi-Fi API", "Text-to-Speech"],
        period: "2023/05/01~2023/7/23",
        members: 3,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/4100",
                title: "23U220050_スマートお迎え | ProtoPedia",
                description: "保護者は保育園のSSID(Wi-Fi名)、クラス名、お子様の名前を登録します。保育園に近づくとSSIDを検知して保育園側の端末で音声呼び出しをしてくれます。",
                favicon: "https://protopedia.net/favicon.ico"
            },
            github: {
                url: "https://github.com/Kei-Adachi0709/SmartPickup",
                title: "GitHub - Kei-Adachi0709/SmartPickup",
                description: "Smart Pickup alerts daycare staff when a parent arrives, helping children prepare and reducing pickup time.",
                favicon: "https://github.githubassets.com/favicons/favicon.svg"
            }
        },
        category: "IoT App",
        featured: true
    },
    {
        id: 3,
        title: "QR食品表示",
        description: "飲食店で、どんな食材が使用されているのかわかりにくい商品があると思います。食品の情報をWebアプリに登録することで、今までわかりにくかった情報をお客さんに正確に伝達することができるようになります。",
        image: "https://protopedia.net/pic/2567fe95-d79f-4d4a-922c-da2c969a5d09.png",
        technologies: ["React", "Node.js", "QR Code", "Database", "Express"],
        period: "2023/11/15~2024/01/15",
        members: 3,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/5781",
                title: "QR食品表示 | ProtoPedia",
                description: "飲食店で、どんな食材が使用されているのかわかりにくい商品があると思います。食品の情報をWebアプリに登録することで、今までわかりにくかった情報をお客さんに正確に伝達することができるようになります。",
                favicon: "https://protopedia.net/favicon.ico"
            },
            github: {
                url: "https://github.com/Kei-Adachi0709/QR-Allergy-Guide",
                title: "GitHub - Kei-Adachi0709/QR-Allergy-Guide",
                description: "Contribute to Kei-Adachi0709/QR-Allergy-Guide development by creating an account on GitHub.",
                favicon: "https://github.githubassets.com/favicons/favicon.svg"
            }
        },
        category: "Web App",
        featured: true
    }
];

// ポートフォリオカード作成関数
function createPortfolioCard(project) {
    return `
        <div class="portfolio__content grid swiper-slide" data-category="${project.category}">
            <img src="${project.image}" alt="${project.title}" class="portfolio__img">
            
            <div class="portfolio__data">
                <h3 class="portfolio__title">${project.title}</h3>
                <p class="portfolio__description">${project.description}</p>
                
                <div class="portfolio__tech">
                    ${project.technologies.map(tech => `<span class="portfolio__tech-tag">${tech}</span>`).join('')}
                </div>
                
                <div class="portfolio__meta">
                    <span class="portfolio__period">📅 ${project.period}</span>
                    <span class="portfolio__members">👥 ${project.members}人</span>
                </div>
                
                <div class="portfolio__links">
                    ${project.links.protopedia ? `
                        <a href="${project.links.protopedia.url}" target="_blank" class="portfolio__link-card">
                            <div class="link-card">
                                <img src="${project.links.protopedia.favicon}" alt="ProtoPedia" class="link-card__favicon">
                                <div class="link-card__content">
                                    <h4 class="link-card__title">${project.links.protopedia.title}</h4>
                                    <p class="link-card__description">${project.links.protopedia.description.substring(0, 100)}...</p>
                                    <span class="link-card__url">protopedia.net</span>
                                </div>
                            </div>
                        </a>
                    ` : ''}
                    
                    ${project.links.github ? `
                        <a href="${project.links.github.url}" target="_blank" class="portfolio__link-card">
                            <div class="link-card">
                                <img src="${project.links.github.favicon}" alt="GitHub" class="link-card__favicon">
                                <div class="link-card__content">
                                    <h4 class="link-card__title">${project.links.github.title}</h4>
                                    <p class="link-card__description">${project.links.github.description.substring(0, 100)}...</p>
                                    <span class="link-card__url">github.com</span>
                                </div>
                            </div>
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// ポートフォリオフィルター関数
function filterPortfolio(category = 'all') {
    const container = document.querySelector('.swiper-wrapper');
    if (!container) return;

    let filteredData = portfolioData;
    if (category !== 'all') {
        filteredData = portfolioData.filter(project => project.category === category);
    }

    container.innerHTML = filteredData.map(project => createPortfolioCard(project)).join('');
    
    // Swiper を再初期化
    if (window.portfolioSwiper) {
        window.portfolioSwiper.update();
    }
}

// ポートフォリオ初期化関数
function initPortfolio() {
    const container = document.querySelector('.swiper-wrapper');
    if (container) {
        // 既存のプレースホルダーをクリア
        container.innerHTML = '';
        
        // 新しいポートフォリオデータを追加
        container.innerHTML = portfolioData.map(project => createPortfolioCard(project)).join('');
    }
}

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});
