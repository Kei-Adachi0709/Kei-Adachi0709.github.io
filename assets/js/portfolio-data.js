// ポートフォリオデータ管理ファイル（実際のプロジェクト）
const portfolioData = [
    {
        id: 1,
        title: "SmartPhoneSaber",
        description: "音楽に合わせてスマホを振って遊ぶアプリです。スマホによる若者の運動不足を解消、そして家庭間のコミュニケーションを広げるためのレクリエーションツールとして制作しました。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🎵 プロジェクト概要</h3>
                <p>音楽に合わせてスマートフォンを振って遊ぶエンターテインメントアプリです。若者の運動不足解消と家庭間コミュニケーション促進を目的としたレクリエーションツールを開発しました。</p>
                
                <h3>🎮 主な機能</h3>
                <ul>
                    <li>スマートフォン内の音楽ファイル選択機能</li>
                    <li>効果音カスタマイズ機能</li>
                    <li>モーションセンサーによる振り検知</li>
                    <li>リアルタイムスコア計算システム</li>
                    <li>楽曲終了時のスコア表示機能</li>
                    <li>直感的なユーザーインターフェース</li>
                </ul>
                
                <h3>⚙️ 技術的な実装</h3>
                <ul>
                    <li>Android Studioを使用したネイティブアプリ開発</li>
                    <li>加速度センサー・ジャイロスコープの活用</li>
                    <li>音声ファイル処理とリアルタイム再生</li>
                    <li>スコアリングアルゴリズムの実装</li>
                    <li>レスポンシブなUI/UX設計</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年5月1日〜7月23日（約3ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 3人（チーム開発）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> システム設計・モーション制御・UI実装</span>
                    </div>
                </div>
            </div>
        `,
        image: "assets/images/projects/smartphone-saber.jpg",
        technologies: ["Android Studio", "Java", "Motion Sensor", "Audio Processing", "UI/UX"],
        period: "2023年5月〜7月",
        members: 3,
        category: "app android",
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/4730",
                title: "SmartPhoneSaber - ProtoPedia",
                description: "音楽に合わせてスマホを振って遊ぶアプリの詳細",
                favicon: "https://protopedia.net/favicon.ico"
            }
        }
    },
    {
        id: 2,
        title: "スマートお迎え",
        description: "保護者が保育園に近づいたら、保育園に保護者の接近を音声で通知するアプリ。児童が事前に帰宅の準備ができ、お迎えにかかる時間を短縮することができます。",
        detailedDescription: `
            <div class="project-detail">
                <h3>👨‍👩‍👧‍👦 プロジェクト概要</h3>
                <p>保護者が保育園に近づくと自動的に保育園に通知し、児童の帰宅準備時間を短縮するスマートなお迎えシステムを開発しました。駐車場の混雑緩和と保護者の利便性向上を実現します。</p>
                
                <h3>📱 主な機能</h3>
                <ul>
                    <li>Wi-Fi SSID検知による自動位置識別</li>
                    <li>保育園側への音声通知システム</li>
                    <li>リアルタイム保護者数表示機能</li>
                    <li>混雑状況の可視化</li>
                    <li>お迎え済み園児の管理機能</li>
                    <li>QRコードによる簡単初期設定</li>
                </ul>
                
                <h3>⚙️ 技術的な実装</h3>
                <ul>
                    <li>Android Studioでのネイティブアプリ開発</li>
                    <li>Wi-Fi SSID検知システムの実装</li>
                    <li>リアルタイム通信（WebSocket/REST API）</li>
                    <li>音声通知システムの構築</li>
                    <li>QRコード生成・読み取り機能</li>
                    <li>保護者・保育園双方向の情報共有システム</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年5月1日〜7月23日（約3ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 3人（チーム開発）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> システム設計・通信機能・UI/UX実装</span>
                    </div>
                </div>
            </div>
        `,
        image: "assets/images/projects/smart-pickup.jpg",
        technologies: ["Android Studio", "Java", "Wi-Fi API", "WebSocket", "QR Code", "REST API"],
        period: "2023年5月〜7月",
        members: 3,
        category: "app android",
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/4100",
                title: "スマートお迎え - ProtoPedia",
                description: "保護者の接近を自動通知するスマートお迎えシステム",
                favicon: "https://protopedia.net/favicon.ico"
            },
            github: {
                url: "https://github.com/Kei-Adachi0709/SmartPickup",
                title: "SmartPickup - GitHub",
                description: "スマートお迎えアプリのソースコード",
                favicon: "https://github.com/favicon.ico"
            }
        }
    },
    {
        id: 3,
        title: "QR食品表示",
        description: "飲食店で、どんな食材が使用されているのかわかりにくい商品があると思います。食品の情報をWebアプリに登録することで、今までわかりにくかった情報をお客さんに正確に伝達することができるようになります。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🍽️ プロジェクト概要</h3>
                <p>キッチンカーや屋台などで詳細な食品情報が分かりにくい問題を解決するWebアプリケーションを開発しました。QRコードを活用して、アレルゲン情報や原材料を簡単に確認できるシステムです。</p>
                
                <h3>🔍 主な機能</h3>
                <ul>
                    <li>飲食店向け商品情報登録システム</li>
                    <li>アレルゲン・原材料詳細表示</li>
                    <li>QRコードによる商品情報アクセス</li>
                    <li>条件検索機能（アレルゲンフリー等）</li>
                    <li>多言語対応システム</li>
                    <li>レスポンシブWebデザイン</li>
                </ul>
                
                <h3>⚙️ 技術的な実装</h3>
                <ul>
                    <li>フロントエンド: HTML5, CSS3, JavaScript</li>
                    <li>バックエンド: PHP/Node.js</li>
                    <li>データベース: MySQL</li>
                    <li>QRコード生成・読み取りライブラリ</li>
                    <li>レスポンシブフレームワーク（Bootstrap）</li>
                    <li>多言語化システム（i18n）</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年11月15日〜2024年1月15日（約2ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 3人（チーム開発）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> フルスタック開発・QRシステム・データベース設計</span>
                    </div>
                </div>
            </div>
        `,
        image: "assets/images/projects/qr-food-display.jpg",
        technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "QR Code", "Bootstrap"],
        period: "2023年11月〜2024年1月",
        members: 3,
        category: "web fullstack",
        links: {
            protopedia: {
                url: "https://protopedia.net/prototype/5781",
                title: "QR食品表示 - ProtoPedia",
                description: "QRコードを使用した食品情報表示システム",
                favicon: "https://protopedia.net/favicon.ico"
            },
            github: {
                url: "https://github.com/Kei-Adachi0709/QR-Allergy-Guide",
                title: "QR-Allergy-Guide - GitHub",
                description: "QR食品表示システムのソースコード",
                favicon: "https://github.com/favicon.ico"
            }
        }
    }
];

// ポートフォリオ初期化関数
function initializePortfolio() {
    console.log('ポートフォリオデータ初期化完了');
    console.log('ポートフォリオ項目数:', portfolioData.length);
    
    // グローバルに公開
    window.portfolioData = portfolioData;
    
    // ポートフォリオデータをグローバルに設定済み
    if (typeof window !== 'undefined') {
        window.portfolioData = portfolioData;
    }
}

// DOMContentLoaded時に初期化
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    // Node.js環境での初期化
    initializePortfolio();
}
