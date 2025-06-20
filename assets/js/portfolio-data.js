// ポートフォリオデータ管理ファイル
const portfolioData = [
    {
        id: 1,
        title: "AWS インフラ構築プロジェクト",
        description: "Terraformを使用してAWS上にスケーラブルなインフラを構築。ALB、Auto Scaling、RDS、ElastiCacheを組み合わせた高可用性アーキテクチャを実装。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🚀 プロジェクト概要</h3>
                <p>スケーラブルなWebアプリケーション用のAWSインフラを構築しました。Terraformを使用したInfrastructure as Codeにより、再現性の高い環境構築を実現しています。</p>
                
                <h3>🏗️ アーキテクチャ設計</h3>
                <ul>
                    <li>Application Load Balancer (ALB) による負荷分散</li>
                    <li>Auto Scalingによる自動スケーリング</li>
                    <li>Multi-AZ RDSによる高可用性データベース</li>
                    <li>ElastiCacheによるキャッシュ層</li>
                    <li>CloudFrontによるCDN配信</li>
                    <li>VPCによるネットワーク分離</li>
                </ul>
                
                <h3>⚙️ 技術的な実装</h3>
                <ul>
                    <li>Terraformを使用したIaCによるインフラ管理</li>
                    <li>AWS Systems Managerによる設定管理</li>
                    <li>CloudWatchによる監視・アラート設定</li>
                    <li>IAMロールによる最小権限の原則実装</li>
                    <li>セキュリティグループによるアクセス制御</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2024年3月1日〜3月31日（1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> インフラ設計・構築・運用</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://via.placeholder.com/600x300/41c9b4/ffffff?text=AWS+Infrastructure",
        technologies: ["AWS", "Terraform", "ALB", "RDS", "Auto Scaling", "CloudWatch"],
        period: "2024年3月",
        members: 1,
        category: "cloud",
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/aws-infrastructure",
                title: "AWS インフラ構築 - GitHub",
                description: "Terraformを使用したAWSインフラ構築のソースコード",
                favicon: "https://github.com/favicon.ico"
            }
        }
    },
    {
        id: 2,
        title: "Kubernetes クラスター構築",
        description: "Kubernetesを使用したマイクロサービスアーキテクチャの実装。Helm、Ingress Controller、Prometheus/Grafanaによる監視体制も構築。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🎯 プロジェクト目標</h3>
                <p>マイクロサービス向けKubernetesクラスターを構築し、コンテナオーケストレーションによる高い可用性とスケーラビリティを実現しました。</p>
                
                <h3>📦 構築内容</h3>
                <ul>
                    <li>Kubernetesクラスターの構築・設定</li>
                    <li>Helmを使用したアプリケーション管理</li>
                    <li>Ingress Controllerによる外部アクセス制御</li>
                    <li>Prometheus/Grafanaによる監視ダッシュボード</li>
                    <li>HPA（Horizontal Pod Autoscaler）による自動スケーリング</li>
                    <li>PersistentVolumeによるデータ永続化</li>
                </ul>
                
                <h3>🔧 使用技術</h3>
                <ul>
                    <li>Kubernetes (EKS) でのクラスター管理</li>
                    <li>Helmチャートによるアプリケーションデプロイ</li>
                    <li>NGINX Ingress Controllerによるトラフィック制御</li>
                    <li>Prometheusによるメトリクス収集</li>
                    <li>Grafanaによるダッシュボード構築</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2024年2月1日〜2月28日（1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> Kubernetesアーキテクト・DevOpsエンジニア</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://via.placeholder.com/600x300/326ce5/ffffff?text=Kubernetes+Cluster",
        technologies: ["Kubernetes", "Docker", "Helm", "Prometheus", "Grafana"],
        period: "2024年2月",
        members: 1,
        category: "devops",
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/k8s-microservices",
                title: "Kubernetes マイクロサービス - GitHub",
                description: "Kubernetesを使用したマイクロサービスアーキテクチャの実装",
                favicon: "https://github.com/favicon.ico"
            }
        }
    },
    {
        id: 3,
        title: "CI/CD パイプライン構築",
        description: "GitHub Actionsを使用したCI/CDパイプライン構築。コードプッシュから本番デプロイまでを自動化するCI/CDパイプラインを構築。テスト、セキュリティチェック、Docker イメージビルドを含む完全自動化を実現。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🔄 CI/CD パイプライン概要</h3>
                <p>GitHub Actionsを使用して、コードプッシュから本番デプロイまでの完全自動化パイプラインを構築しました。</p>
                
                <h3>🚀 自動化フロー</h3>
                <ol>
                    <li>コードプッシュ・プルリクエスト検知</li>
                    <li>自動テスト実行（ユニット・統合テスト）</li>
                    <li>セキュリティスキャン（SonarQube）</li>
                    <li>Dockerイメージビルド・プッシュ</li>
                    <li>ステージング環境デプロイ</li>
                    <li>本番環境デプロイ（マニュアル承認）</li>
                </ol>
                
                <h3>🛡️ セキュリティ・品質管理</h3>
                <ul>
                    <li>SonarQubeによるコード品質チェック</li>
                    <li>依存関係の脆弱性スキャン</li>
                    <li>Dockerイメージのセキュリティスキャン</li>
                    <li>自動テストカバレッジ測定</li>
                    <li>デプロイ前の手動承認プロセス</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2024年1月1日〜1月31日（1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> DevOpsエンジニア・CI/CD設計</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://via.placeholder.com/600x300/f05032/ffffff?text=CI%2FCD+Pipeline",
        technologies: ["GitHub Actions", "Docker", "SonarQube", "AWS ECR", "Kubernetes"],
        period: "2024年1月",
        members: 1,
        category: "automation",
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/cicd-pipeline",
                title: "CI/CD パイプライン - GitHub",
                description: "GitHub Actionsを使用したCI/CDパイプラインの実装",
                favicon: "https://github.com/favicon.ico"
            }
        }
    },
    {
        id: 4,
        title: "モニタリングシステム構築",
        description: "Prometheusによるメトリクス収集とGrafanaによる可視化を組み合わせたモニタリングシステム。アラート機能とSlack通知も実装。",
        detailedDescription: `
            <div class="project-detail">
                <h3>📊 モニタリングシステム概要</h3>
                <p>Prometheus + Grafanaを使用した包括的なインフラモニタリングシステムを構築しました。</p>
                
                <h3>🔍 監視項目</h3>
                <ul>
                    <li>サーバーリソース（CPU、メモリ、ディスク）</li>
                    <li>ネットワークトラフィック</li>
                    <li>アプリケーションメトリクス</li>
                    <li>データベースパフォーマンス</li>
                    <li>Kubernetesクラスター状態</li>
                    <li>ビジネスメトリクス（レスポンス時間、エラー率）</li>
                </ul>
                
                <h3>🚨 アラート機能</h3>
                <ul>
                    <li>AlertManagerによるアラート管理</li>
                    <li>Slack通知による即座の問題通知</li>
                    <li>重要度レベル別のアラート分類</li>
                    <li>ダッシュボードでの視覚的な問題発見</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年12月1日〜12月31日（1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> SREエンジニア・モニタリング設計</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://via.placeholder.com/600x300/e6522c/ffffff?text=Monitoring+Dashboard",
        technologies: ["Prometheus", "Grafana", "AlertManager", "Slack API", "Docker"],
        period: "2023年12月",
        members: 1,
        category: "devops",
        links: {
            protopedia: {
                url: "https://protopedia.net/user/Kei-Adachi0709/monitoring-system",
                title: "モニタリングシステム - ProtoPedia",
                description: "Prometheus + Grafanaモニタリングシステムの詳細",
                favicon: "https://protopedia.net/favicon.ico"
            }
        }
    },
    {
        id: 5,
        title: "Webアプリケーション開発",
        description: "React + Node.js + PostgreSQLを使用したフルスタックWebアプリケーション。RESTful APIの設計・実装とレスポンシブデザインを両立。",
        detailedDescription: `
            <div class="project-detail">
                <h3>💻 アプリケーション概要</h3>
                <p>モダンなフルスタック技術を使用したレスポンシブWebアプリケーションを開発しました。</p>
                
                <h3>🎨 フロントエンド機能</h3>
                <ul>
                    <li>React Hooksを使用した状態管理</li>
                    <li>レスポンシブデザイン（スマホ・タブレット対応）</li>
                    <li>Material-UIによるモダンなUI</li>
                    <li>Redux Toolkitでの状態管理</li>
                    <li>Axiosを使用したAPI通信</li>
                </ul>
                
                <h3>⚙️ バックエンド機能</h3>
                <ul>
                    <li>Express.jsによるRESTful API</li>
                    <li>JWT認証によるセキュアな認証システム</li>
                    <li>PostgreSQLデータベース設計</li>
                    <li>Prisma ORMによるデータアクセス</li>
                    <li>バリデーション・エラーハンドリング</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年11月1日〜11月30日（1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> フルスタック開発・UI/UXデザイン</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://via.placeholder.com/600x300/61dafb/000000?text=React+Web+App",
        technologies: ["React", "Node.js", "PostgreSQL", "Express.js", "Material-UI"],
        period: "2023年11月",
        members: 1,
        category: "web",
        links: {
            demo: {
                url: "https://your-demo-url.com",
                title: "Webアプリケーション デモ",
                description: "実際のアプリケーションを体験できます",
                favicon: "https://your-demo-url.com/favicon.ico"
            },
            github: {
                url: "https://github.com/Kei-Adachi0709/web-application",
                title: "Webアプリケーション - GitHub",
                description: "React + Node.js フルスタックアプリケーションのソースコード",
                favicon: "https://github.com/favicon.ico"
            }
        }
    },
    {
        id: 6,
        title: "インフラ運用自動化",
        description: "Pythonで作成したインフラ運用自動化ツール群。サーバー監視、ログ解析、バックアップ作業の自動化により運用効率を大幅改善。",
        detailedDescription: `
            <div class="project-detail">
                <h3>🤖 自動化ツール概要</h3>
                <p>Pythonで作成した運用業務自動化ツール群により、日常的なインフラ運用作業を効率化しました。</p>
                
                <h3>⚡ 自動化機能</h3>
                <ul>
                    <li>サーバーヘルスチェック自動化</li>
                    <li>ログ解析・異常検知</li>
                    <li>定期バックアップ自動実行</li>
                    <li>リソース使用量レポート生成</li>
                    <li>セキュリティパッチ適用自動化</li>
                    <li>障害通知・エスカレーション</li>
                </ul>
                
                <h3>📈 効果・改善</h3>
                <ul>
                    <li>手動作業時間を70%削減</li>
                    <li>ヒューマンエラーの大幅削減</li>
                    <li>24時間365日の自動監視実現</li>
                    <li>インシデント対応時間の短縮</li>
                </ul>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span><strong>制作期間:</strong> 2023年10月1日〜10月31日（1ヶ月）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-team-line"></i>
                        <span><strong>制作人数:</strong> 1人（個人プロジェクト）</span>
                    </div>
                    <div class="meta-item">
                        <i class="ri-user-line"></i>
                        <span><strong>担当:</strong> インフラ自動化エンジニア</span>
                    </div>
                </div>
            </div>
        `,
        image: "https://via.placeholder.com/600x300/3776ab/ffffff?text=Python+Automation",
        technologies: ["Python", "Bash", "Cron", "Ansible", "AWS CLI"],
        period: "2023年10月",
        members: 1,
        category: "automation",
        links: {
            github: {
                url: "https://github.com/Kei-Adachi0709/automation-scripts",
                title: "インフラ自動化スクリプト - GitHub",
                description: "Pythonで作成したインフラ運用自動化ツール群",
                favicon: "https://github.com/favicon.ico"
            }
        }
    }
];

// グローバルにアクセス可能にする
window.portfolioData = portfolioData;

// ポートフォリオ初期化関数
function initPortfolio() {
    // この関数は今回のリファクタリングでは使用しません
    // 代わりにnote-app.jsでモーダル機能を統合管理します
}

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // ポートフォリオデータをグローバルに設定済み
    console.log('Portfolio data loaded:', portfolioData);
});
