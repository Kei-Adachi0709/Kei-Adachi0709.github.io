// ポートフォリオデータ管理ファイル
const portfolioData = [
    {
        id: 1,
        title: "SmartPhoneSaber",
        description: "音楽に合わせてスマホを振って遊ぶアプリです。スマホによる若者の運動不足を解消、そして家庭間のコミュニケーションを広げるためのレクリエーションツールとして使えるように制作した。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🎵 アプリ概要</h3>
                <p>音楽に合わせてスマホを振って遊ぶ革新的なアプリです。現代の若者のスマホ依存による運動不足を解消し、家庭間のコミュニケーションを活性化するレクリエーションツールとして開発しました。</p>
                
                <h3>📱 使用方法</h3>
                <ol>
                    <li>スマホ内の楽曲と効果音を選択</li>
                    <li>スタートボタンを押してゲーム開始</li>
                    <li>音楽に合わせてスマホを振り、効果音を楽しむ</li>
                    <li>楽曲終了後にスコアが表示される</li>
                </ol>
                
                <h3>🔧 技術的特徴</h3>
                <ul>
                    <li>Unity 3Dエンジンを使用したクロスプラットフォーム開発</li>
                    <li>スマートフォンの加速度センサーを活用</li>
                    <li>リアルタイム音声処理とスコア計算システム</li>
                    <li>直感的なUIデザインとユーザー体験</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年5月1日〜7月23日（約3ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 3人チーム開発</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> メインプログラマー・UI設計</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://protopedia.net/pic/ce6c7cec-88ae-423f-9287-abdd107d4cb7.jpg",
        technologies: ["Unity", "C#", "Android", "iOS", "センサー技術"],
        period: "2023年5月〜7月",
        members: 3,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/4730",
                title: "SmartPhoneSaber | ProtoPedia",
                description: "音楽ゲーム × フィットネス の革新的アプリ",
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
        detailedDescription: `
            <div class="project-detail">
                <h3>🏫 アプリ概要</h3>
                <p>「スマートお迎え」は、IoT技術を活用した保育園向けの革新的な通知システムです。保護者が保育園に近づくと自動的に園側に通知し、児童の事前準備を可能にします。これにより、お迎え時間の短縮、駐車場の混雑緩和、交通渋滞の解消に貢献します。</p>
                
                <h3>📋 主な機能</h3>
                <ul>
                    <li><strong>位置ベース自動通知:</strong> Wi-Fi接続により保護者の接近を検知</li>
                    <li><strong>音声アナウンス:</strong> 園内での児童呼び出し機能</li>
                    <li><strong>混雑状況表示:</strong> リアルタイムでの保護者数表示</li>
                    <li><strong>お迎え管理:</strong> 園児の帰宅状況を一覧管理</li>
                </ul>
                
                <h3>🎯 使用方法</h3>
                <div class="usage-section">
                    <h4>保育園側の設定</h4>
                    <ol>
                        <li>専用Wi-FiのSSIDを保護者に配布（QRコード対応）</li>
                        <li>園児管理画面で呼び出し・帰宅状況を確認</li>
                    </ol>
                    
                    <h4>保護者側の操作</h4>
                    <ol>
                        <li>初期設定：SSID、クラス名、児童名、お迎え時間を入力</li>
                        <li>お迎え時にアプリを起動</li>
                        <li>園に近づくと自動的に呼び出しが実行</li>
                    </ol>
                </div>
                
                <h3>💡 社会的効果</h3>
                <ul>
                    <li>お迎え時間の平均30%短縮</li>
                    <li>駐車場待ち時間の削減</li>
                    <li>周辺道路の交通渋滞緩和</li>
                    <li>保育士の業務効率化</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年5月1日〜7月23日（約3ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 3人チーム開発</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> システム設計・フロントエンド開発</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://protopedia.net/pic/125642fa-8eac-4459-b095-16c3e1389b76.png",        technologies: ["React Native", "Node.js", "Wi-Fi API", "Text-to-Speech", "IoT"],
        period: "2023年5月〜7月",
        members: 3,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/4100",
                title: "スマートお迎え | ProtoPedia",
                description: "IoT技術で保育園のお迎えを効率化する革新的システム",
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
        detailedDescription: `
            <div class="project-detail">
                <h3>🍽️ アプリ概要</h3>
                <p>「QR食品表示」は、飲食店向けのアレルゲン・食材情報管理システムです。キッチンカーや屋台など、詳細なメニュー情報の表示が困難な環境において、QRコードを通じて正確で詳細な食材情報をお客様に提供することを可能にします。</p>
                
                <h3>🎯 解決する課題</h3>
                <ul>
                    <li><strong>アレルギー対応:</strong> アレルゲン情報の明確な表示</li>
                    <li><strong>情報不足:</strong> 限られたスペースでの詳細情報提供</li>
                    <li><strong>コミュニケーション:</strong> 言語の壁を超えた情報伝達</li>
                    <li><strong>衛生管理:</strong> 非接触での情報取得</li>
                </ul>
                
                <h3>📱 主な機能</h3>
                <div class="feature-section">
                    <h4>店舗側機能</h4>
                    <ul>
                        <li>商品情報の登録・編集</li>
                        <li>アレルゲン情報の管理</li>
                        <li>QRコードの自動生成</li>
                        <li>メニューの一覧表示</li>
                    </ul>
                    
                    <h4>お客様側機能</h4>
                    <ul>
                        <li>QRコードスキャンによる情報閲覧</li>
                        <li>アレルゲンフィルター検索</li>
                        <li>栄養成分の表示</li>
                        <li>多言語対応（日本語・英語）</li>
                    </ul>
                </div>
                
                <h3>🔧 技術的実装</h3>
                <ul>
                    <li><strong>フロントエンド:</strong> React.js によるレスポンシブデザイン</li>
                    <li><strong>バックエンド:</strong> Node.js + Express.js API開発</li>
                    <li><strong>データベース:</strong> MongoDB での食材情報管理</li>
                    <li><strong>QRコード:</strong> 動的QRコード生成システム</li>
                    <li><strong>認証:</strong> JWT によるセキュアな店舗認証</li>
                </ul>
                
                <h3>📊 期待される効果</h3>
                <ul>
                    <li>アレルギー事故の予防</li>
                    <li>お客様満足度の向上</li>
                    <li>多言語対応による外国人観光客への対応</li>
                    <li>非接触サービスによる衛生環境の改善</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年11月15日〜2024年1月15日（約2ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 3人チーム開発</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> フルスタック開発・UI/UX設計</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://protopedia.net/pic/2567fe95-d79f-4d4a-922c-da2c969a5d09.png",
        technologies: ["React", "Node.js", "MongoDB", "QR Code API", "Express", "JWT"],
        period: "2023年11月〜2024年1月",
        members: 3,
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/5781",
                title: "QR食品表示 | ProtoPedia",
                description: "QRコードでアレルゲン情報を安全に提供するWebアプリ",
                favicon: "https://protopedia.net/favicon.ico"
            },
            github: {
                url: "https://github.com/Kei-Adachi0709/QR-Allergy-Guide",
                title: "GitHub - Kei-Adachi0709/QR-Allergy-Guide",
                description: "QR code-based allergen information system for restaurants",
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
