# 🚀 GitHub Pages 完全デプロイ手順書
**ローカル開発からプロダクション公開まで - 完全ガイド**

## 📋 事前準備チェックリスト

### ✅ 必要な環境
- [ ] **Git**: 2.30.0 以上
- [ ] **Node.js**: 18.0.0 以上 (推奨: 20.x LTS)
- [ ] **npm**: 9.0.0 以上
- [ ] **GitHub アカウント**: 有効なアカウント
- [ ] **SSH Key**: GitHub に登録済み (推奨)

### ✅ GitHub アカウント設定
```bash
# Git ユーザー情報設定
git config --global user.name "Kei Adachi"
git config --global user.email "kei.adachi0709@example.com"

# SSH Key 生成 (未設定の場合)
ssh-keygen -t ed25519 -C "kei.adachi0709@example.com"
```

---

## 🏗️ Phase 1: ローカルリポジトリ初期化

### 1.1 プロジェクト準備
```bash
# プロジェクトディレクトリに移動
cd c:\GitHubProject\Kei-Adachi0709.github.io

# Git リポジトリ初期化
git init

# 初期ブランチを main に設定
git branch -M main

# .gitignore 確認
cat .gitignore
```

### 1.2 依存関係インストール
```bash
# Node.js パッケージインストール
npm install

# 依存関係確認
npm ls --depth=0

# セキュリティ監査
npm audit
npm audit fix --force
```

### 1.3 初期ビルド & テスト
```bash
# 開発ビルド
npm run build:dev

# 本番ビルド
npm run build

# 包括的テスト
npm run perf

# 構文チェック
npm run lint
npm run format
```

---

## 🌐 Phase 2: GitHub リモートリポジトリ作成・連携

### 2.1 GitHub リポジトリ作成

#### Web インターフェース (推奨)
1. https://github.com にアクセス
2. **"New repository"** をクリック
3. リポジトリ設定:
   ```
   Repository name: Kei-Adachi0709.github.io
   Description: Portfolio Website - Frontend Developer
   Visibility: ✅ Public (GitHub Pages 必須)
   ✅ Add a README file: チェックしない
   ✅ Add .gitignore: None
   ✅ Add license: MIT License (推奨)
   ```
4. **"Create repository"** をクリック

#### GitHub CLI (オプション)
```bash
# GitHub CLI インストール確認
gh --version

# GitHub CLI でリポジトリ作成
gh repo create Kei-Adachi0709.github.io --public --description "Portfolio Website - Frontend Developer"
```

### 2.2 リモートリポジトリ連携
```bash
# リモートリポジトリ追加 (HTTPS)
git remote add origin https://github.com/Kei-Adachi0709/Kei-Adachi0709.github.io.git

# リモートリポジトリ追加 (SSH - 推奨)
git remote add origin git@github.com:Kei-Adachi0709/Kei-Adachi0709.github.io.git

# リモート設定確認
git remote -v
```

---

## 📤 Phase 3: 初回プッシュ

### 3.1 ファイル追加・コミット
```bash
# 全ファイルをステージング
git add .

# 初回コミット
git commit -m "🎉 Initial commit: Portfolio website with performance optimization

✨ Features:
- Google PageSpeed Insights 90+ optimization
- PWA support with Service Worker
- Critical CSS and image optimization
- Accessibility (95+) and SEO (95+) compliance
- Comprehensive security implementation

🛠️ Tech Stack:
- HTML5, CSS3, JavaScript ES6+
- Webpack 5, PostCSS, Babel
- Service Worker, WebP images
- JSON-LD structured data

🎯 Ready for production deployment"

# 初回プッシュ
git push -u origin main
```

### 3.2 プッシュ確認
```bash
# プッシュ状態確認
git status
git log --oneline -5

# GitHub で確認
# https://github.com/Kei-Adachi0709/Kei-Adachi0709.github.io
```

---

## 🌐 Phase 4: GitHub Pages 設定

### 4.1 GitHub Pages 有効化

#### Web インターフェース
1. **GitHub リポジトリページ** に移動
2. **"Settings"** タブをクリック
3. 左メニューの **"Pages"** をクリック
4. **"Build and deployment"** 設定:
   ```
   Source: ✅ Deploy from a branch
   Branch: ✅ main / (root)
   ```
5. **"Save"** をクリック

#### GitHub CLI
```bash
# GitHub Pages 有効化
gh api repos/Kei-Adachi0709/Kei-Adachi0709.github.io/pages \
  --method POST \
  --field source='{"branch":"main","path":"/"}'
```

### 4.2 カスタムドメイン設定 (オプション)
```bash
# カスタムドメインファイル作成
echo "your-custom-domain.com" > CNAME

# コミット・プッシュ
git add CNAME
git commit -m "🌐 Add custom domain configuration"
git push origin main
```

### 4.3 HTTPS 強制設定
1. GitHub Pages 設定画面で
2. **"Enforce HTTPS"** にチェック ✅
3. SSL証明書の自動発行を待機 (数分〜数時間)

---

## 🔄 Phase 5: 継続的デプロイフロー

### 5.1 日常の開発・デプロイワークフロー

#### 開発サイクル
```bash
# 1. 最新コードを取得
git pull origin main

# 2. 新しいブランチで開発 (機能別)
git checkout -b feature/performance-improvement

# 3. 開発サーバー起動
npm run dev

# 4. 変更・テスト
# ファイル編集...
npm run lint
npm run test:lighthouse

# 5. コミット
git add .
git commit -m "⚡ Improve Core Web Vitals performance

- Optimize image loading with WebP conversion
- Implement lazy loading for below-fold images
- Reduce JavaScript bundle size by 20%
- Achieve LCP < 1.2s on mobile devices"

# 6. プッシュ
git push origin feature/performance-improvement

# 7. プルリクエスト作成
gh pr create --title "⚡ Performance Optimization" --body "Detailed description..."

# 8. マージ後、main ブランチに戻る
git checkout main
git pull origin main
```

#### 本番デプロイ (自動)
```bash
# main ブランチへのプッシュで自動デプロイ
git checkout main
git merge feature/performance-improvement
git push origin main

# 🤖 GitHub Actions が自動実行:
# ✅ ビルド・最適化
# ✅ セキュリティチェック  
# ✅ パフォーマンステスト
# ✅ デプロイ
# ✅ 事後検証
```

### 5.2 緊急デプロイ・ホットフィックス
```bash
# 緊急修正用ブランチ
git checkout -b hotfix/critical-security-fix

# 修正・テスト
# ファイル修正...
npm run security:test

# 緊急コミット
git add .
git commit -m "🔒 HOTFIX: Critical security vulnerability

- Fix XSS vulnerability in contact form
- Update CSP headers for stricter policy
- Emergency deployment required"

# 緊急プッシュ
git push origin hotfix/critical-security-fix

# 緊急マージ
git checkout main
git merge hotfix/critical-security-fix
git push origin main
```

### 5.3 ロールバック手順
```bash
# 直前のコミットに戻す
git revert HEAD
git push origin main

# 特定のコミットに戻す
git revert <commit-hash>
git push origin main

# 強制ロールバック (最終手段)
git reset --hard <previous-commit-hash>
git push --force origin main
```

---

## 🎛️ Phase 6: 運用・メンテナンス手順

### 6.1 定期メンテナンス

#### 週次作業
```bash
# 依存関係更新
npm update
npm audit fix

# セキュリティチェック
npm run security:scan

# パフォーマンステスト
npm run perf

# 結果コミット
git add package*.json
git commit -m "🔧 Weekly maintenance: Update dependencies"
git push origin main
```

#### 月次作業
```bash
# 包括的システムチェック
npm run audit:comprehensive

# 競合分析・ベンチマーク
npm run benchmark:competitors

# パフォーマンス履歴レポート
npm run report:monthly

# GitHub Actions ログ確認
gh run list --limit 50
```

### 6.2 監視・アラート設定

#### GitHub Actions 通知設定
```yaml
# .github/workflows/monitoring.yml
name: 🔔 Performance Monitoring

on:
  schedule:
    - cron: '0 */6 * * *'  # 6時間毎

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - name: PageSpeed Insights Check
      - name: Uptime Check
      - name: Security Scan
      - name: Alert if below threshold
```

#### 外部監視ツール連携
```bash
# StatusCake設定例
curl -H "API: YOUR_API_KEY" \
     -H "Username: YOUR_USERNAME" \
     -d "WebsiteName=Kei Adachi Portfolio" \
     -d "WebsiteURL=https://kei-adachi0709.github.io" \
     -d "TestType=HTTP" \
     -d "CheckRate=300" \
     https://app.statuscake.com/API/Tests/Update
```

---

## 🚨 トラブルシューティング

### 🔧 よくある問題と解決策

#### 問題1: GitHub Actions デプロイ失敗
```bash
# ログ確認
gh run list --workflow="deploy.yml" --limit 5
gh run view <run-id> --log

# 手動再実行
gh workflow run deploy.yml

# ローカルでデバッグ
npm run build 2>&1 | tee build-debug.log
```

#### 問題2: パフォーマンススコア低下
```bash
# 詳細分析
npm run test:lighthouse -- --view
npm run build:analyze

# 画像最適化再実行
npm run images:optimize --force

# Critical CSS 再生成
npm run css:critical --rebuild
```

#### 問題3: SSL/HTTPS エラー
```bash
# DNS 設定確認
nslookup kei-adachi0709.github.io

# SSL証明書状態確認
openssl s_client -connect kei-adachi0709.github.io:443 -servername kei-adachi0709.github.io

# GitHub Pages 再デプロイ
gh api repos/Kei-Adachi0709/Kei-Adachi0709.github.io/pages/builds --method POST
```

#### 問題4: 依存関係の脆弱性
```bash
# 脆弱性詳細確認
npm audit --audit-level high

# 自動修正
npm audit fix --force

# 手動更新
npm update package-name@latest
```

---

## 📊 Phase 7: 最終チェックリスト

### ✅ デプロイ前チェック
- [ ] **ビルド成功**: `npm run build` エラーなし
- [ ] **テスト通過**: `npm run perf` 全て通過
- [ ] **セキュリティ**: `npm audit` 重大な脆弱性なし
- [ ] **リンクチェック**: 全リンクが有効
- [ ] **画像最適化**: WebP変換・圧縮完了
- [ ] **メタデータ**: OGP・SEO情報正確

### ✅ デプロイ後確認
- [ ] **サイト表示**: https://kei-adachi0709.github.io にアクセス可能
- [ ] **パフォーマンス**: PageSpeed Insights 90+点
- [ ] **モバイル対応**: レスポンシブデザイン正常動作
- [ ] **PWA**: Service Worker 正常動作
- [ ] **アクセシビリティ**: スクリーンリーダー対応
- [ ] **SEO**: Google Search Console 登録・検証

### ✅ 継続運用準備
- [ ] **監視設定**: アップタイム・パフォーマンス監視
- [ ] **バックアップ**: コード・設定のバックアップ
- [ ] **ドキュメント**: 運用手順書完備
- [ ] **チーム共有**: アクセス権限・ノウハウ共有

---

## 🎯 就活アピール用追加設定

### 📊 実績表示バッジ設定
```markdown
# README.md に追加
[![PageSpeed Insights](https://img.shields.io/badge/PageSpeed-90%2B-brightgreen)](https://pagespeed.web.dev/analysis/https-kei-adachi0709-github-io)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-90%2B-brightgreen)](https://lighthouse-metrics.com)
[![Uptime](https://img.shields.io/badge/Uptime-99.9%25-success)](https://status.example.com)
```

### 📈 Analytics 設定
```javascript
// Google Analytics 4 実装確認
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {'custom_parameter_1': 'job_application_source'}
});
```

### 🔗 ソーシャルメディア連携
```html
<!-- LinkedIn 最適化 -->
<meta property="og:type" content="profile">
<meta property="profile:first_name" content="慧">
<meta property="profile:last_name" content="足立">
<meta property="profile:username" content="kei-adachi0709">
```

---

## 📞 サポート・問い合わせ

### 🆘 緊急時連絡先
- **技術的問題**: GitHub Issues
- **セキュリティ問題**: security@example.com  
- **インフラ問題**: DevOps Team

### 📚 参考資料
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

---

**🌟 これで、採用担当者に強い印象を与える技術力証明ポートフォリオサイトの完全自動化デプロイシステムが構築完了です！**

**最終更新**: 2025年6月18日  
**作成者**: 足立慧 (Kei Adachi)  
**Phase**: 5/5 完了 🎯
