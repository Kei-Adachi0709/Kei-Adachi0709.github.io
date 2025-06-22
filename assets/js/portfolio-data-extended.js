// 拡張ポートフォリオデータ管理ファイル（実際のプロジェクト + インフラプロジェクト）
const portfolioDataExtended = [
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
        image: "assets/images/projects/smartphone-saber-screenshot.jpg",
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
        image: "assets/images/projects/smart-pickup-parent.jpg",
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
        image: "assets/images/projects/qr-food-customer.jpg",
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
    },
    {
        id: 4,
        title: "AWS インフラ構築プロジェクト",
        description: "Terraformを使用してAWS上にスケーラブルなインフラを構築。ALB、Auto Scaling、RDS、ElastiCacheを組み合わせた高可用性アーキテクチャを実装。",
        detailedDescription: `
            <div class="project-detail">
                <h3>☁️ プロジェクト概要</h3>
                <p>スケーラブルなWebアプリケーション用のAWSインフラストラクチャをTerraformでコード化。高可用性と自動スケーリングを実現する現代的なクラウドアーキテクチャを構築しました。</p>
                
                <h3>🏗️ アーキテクチャ構成</h3>
                <ul>
                    <li>Application Load Balancer（ALB）による負荷分散</li>
                    <li>Auto Scaling Groupによる自動スケーリング</li>
                    <li>Amazon RDS Multi-AZによる高可用性データベース</li>
                    <li>ElastiCacheによるセッション管理とキャッシュ</li>
                    <li>CloudWatch による監視とアラート設定</li>
                    <li>VPCとサブネットによるセキュアなネットワーク構成</li>
                </ul>
                
                <h3>⚙️ 技術的成果</h3>
                <ul>
                    <li>Infrastructure as Code（IaC）の実践</li>
                    <li>環境構築の自動化と再現性の確保</li>
                    <li>適切なセキュリティグループ設定</li>
                    <li>コスト最適化を考慮したリソース配置</li>
                    <li>災害復旧対応のためのMulti-AZ構成</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2024年3月（約1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> インフラ設計・Terraform実装・運用設計</span>
                    </div>
                </div>
            </div>
        `,
        image: "assets/images/projects/aws-infrastructure.jpg",
        technologies: ["Terraform", "AWS", "ALB", "RDS", "Auto Scaling", "CloudWatch"],
        period: "2024年3月",
        members: 1,
        category: "infrastructure aws devops",
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/aws-terraform-infrastructure",
                title: "AWS Terraform Infrastructure - GitHub",
                description: "TerraformによるAWSインフラ構築のソースコード",
                favicon: "https://github.com/favicon.ico"
            }
        }
    },
    {
        id: 5,
        title: "Kubernetes デプロイメント",
        description: "Kubernetesを使用したマイクロサービスアーキテクチャの実装。Helm、Ingress Controller、Prometheus/Grafanaによる監視体制も構築。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🚢 プロジェクト概要</h3>
                <p>Kubernetesクラスター上でマイクロサービスアーキテクチャを実装。Helmチャートによるアプリケーション管理と、Prometheus/Grafanaによる包括的な監視システムを構築しました。</p>
                
                <h3>🔧 実装内容</h3>
                <ul>
                    <li>Kubernetesクラスターのセットアップと設定</li>
                    <li>Helmチャートによるアプリケーション管理</li>
                    <li>Ingress Controllerによる外部アクセス制御</li>
                    <li>Prometheusによるメトリクス収集</li>
                    <li>Grafanaによる可視化ダッシュボード構築</li>
                    <li>自動デプロイメントパイプラインの構築</li>
                </ul>
                
                <h3>📊 学習成果</h3>
                <ul>
                    <li>コンテナオーケストレーションの実践</li>
                    <li>マイクロサービスアーキテクチャの設計</li>
                    <li>Helmによるパッケージ管理</li>
                    <li>監視・ログ管理システムの構築</li>
                    <li>DevOpsベストプラクティスの実践</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2024年2月（約1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> Kubernetes設計・Helm開発・監視システム構築</span>
                    </div>
                </div>
            </div>
        `,
        image: "assets/images/projects/kubernetes-dashboard.jpg",
        technologies: ["Kubernetes", "Docker", "Helm", "Prometheus", "Grafana", "Ingress"],
        period: "2024年2月",
        members: 1,
        category: "infrastructure kubernetes devops",
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/k8s-microservices",
                title: "Kubernetes Microservices - GitHub",
                description: "Kubernetesマイクロサービス環境のソースコード",
                favicon: "https://github.com/favicon.ico"
            }
        }
    },
    {
        id: 6,
        title: "CI/CD パイプライン",
        description: "GitHub Actionsを使用したCI/CDパイプライン構築。コードプッシュから本番デプロイまでを自動化し、テスト・セキュリティチェック・Dockerイメージビルドを含む完全自動化を実現。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🔄 プロジェクト概要</h3>
                <p>GitHub Actionsを活用した包括的なCI/CDパイプラインを構築。開発からデプロイまでの全工程を自動化し、品質保証とデプロイメント効率の向上を実現しました。</p>
                
                <h3>🛠️ パイプライン構成</h3>
                <ul>
                    <li>自動テスト実行（Unit Test、Integration Test）</li>
                    <li>SonarQubeによるコード品質チェック</li>
                    <li>セキュリティ脆弱性スキャン</li>
                    <li>Dockerイメージの自動ビルドとプッシュ</li>
                    <li>AWS ECRへのイメージ登録</li>
                    <li>本番環境への自動デプロイ</li>
                </ul>
                
                <h3>📈 導入効果</h3>
                <ul>
                    <li>手動デプロイ作業の削減</li>
                    <li>デプロイ頻度の向上</li>
                    <li>バグの早期発見と修正</li>
                    <li>人的ミスの大幅な削減</li>
                    <li>開発サイクルの高速化</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2024年1月（約1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> CI/CD設計・パイプライン構築・自動化スクリプト開発</span>
                    </div>
                </div>
            </div>
        `,
        image: "assets/images/projects/cicd-pipeline.jpg",
        technologies: ["GitHub Actions", "Docker", "SonarQube", "AWS ECR", "Terraform", "Kubernetes"],
        period: "2024年1月",
        members: 1,
        category: "devops cicd automation",
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/cicd-pipeline-template",
                title: "CI/CD Pipeline Template - GitHub",
                description: "GitHub ActionsによるCI/CDパイプラインのテンプレート",
                favicon: "https://github.com/favicon.ico"
            }
        }
    }
];

// 既存のportfolioDataを拡張版で上書き
window.portfolioData = portfolioDataExtended;

// ポートフォリオ初期化関数を拡張
function initializeExtendedPortfolio() {
    console.log('拡張ポートフォリオデータ初期化完了');
    console.log('ポートフォリオ項目数:', portfolioDataExtended.length);
    
    // グローバルに公開
    window.portfolioData = portfolioDataExtended;
}

// DOMContentLoaded時に初期化
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeExtendedPortfolio);
} else {
    initializeExtendedPortfolio();
}
