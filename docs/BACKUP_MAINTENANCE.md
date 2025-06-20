# 🔄 バックアップ戦略 & 運用メンテナンス手順
**Backup Strategy & Operational Maintenance Guide**

## 🎯 バックアップ目標
- **RPO (Recovery Point Objective)**: 1時間以内
- **RTO (Recovery Time Objective)**: 30分以内
- **可用性**: 99.9%以上
- **データ保持期間**: 90日間

---

## 💾 バックアップ戦略

### 🌐 GitHub リポジトリバックアップ

#### 1. 自動バックアップ (GitHub Actions)
```yaml
# .github/workflows/backup.yml
name: 🔄 Automated Backup

on:
  schedule:
    # 毎日午前3時に自動バックアップ
    - cron: '0 3 * * *'
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Create full repository backup
      - name: Backup to multiple cloud providers
      - name: Verify backup integrity
```

#### 2. マルチロケーションバックアップ
```bash
# GitHub → Google Drive
rclone sync . gdrive:portfolio-backup/$(date +%Y%m%d)

# GitHub → AWS S3
aws s3 sync . s3://portfolio-backup-bucket/$(date +%Y%m%d)

# GitHub → Dropbox
rclone sync . dropbox:portfolio-backup/$(date +%Y%m%d)
```

#### 3. ローカルバックアップ
```bash
# 週次ローカルバックアップ
git clone --mirror https://github.com/Kei-Adachi0709/Kei-Adachi0709.github.io.git
tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz Kei-Adachi0709.github.io.git/
```

### 📊 データバックアップ

#### 1. GitHub Pages コンテンツ
```bash
# 公開サイトの完全バックアップ
wget --mirror --page-requisites --html-extension \
     --convert-links --domains kei-adachi0709.github.io \
     https://kei-adachi0709.github.io/
```

#### 2. Google Analytics データ
```javascript
// GA4 データエクスポート
const {BetaAnalyticsDataClient} = require('@google-analytics/data');
const analyticsDataClient = new BetaAnalyticsDataClient();

async function backupAnalyticsData() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    dateRanges: [{startDate: '30daysAgo', endDate: 'today'}],
    dimensions: [{name: 'country'}, {name: 'deviceCategory'}],
    metrics: [{name: 'activeUsers'}, {name: 'sessions'}]
  });
  
  // CSV形式で保存
  fs.writeFileSync(`analytics-backup-${date}.csv`, formatToCSV(response));
}
```

#### 3. パフォーマンスデータ
```bash
# Lighthouse レポート履歴バックアップ
mkdir -p backups/lighthouse/$(date +%Y%m)
cp reports/lighthouse-*.json backups/lighthouse/$(date +%Y%m)/

# PageSpeed Insights データバックアップ
npm run test:pagespeed --silent > backups/pagespeed/$(date +%Y%m%d).log
```

---

## 🔧 運用メンテナンス手順

### 📅 日次メンテナンス (自動化)

#### 1. システム監視
```bash
#!/bin/bash
# daily-monitoring.sh

# サイト稼働確認
curl -f https://kei-adachi0709.github.io || echo "❌ Site Down"

# SSL証明書確認
openssl s_client -connect kei-adachi0709.github.io:443 -servername kei-adachi0709.github.io 2>/dev/null | openssl x509 -noout -dates

# パフォーマンスクイックチェック
lighthouse https://kei-adachi0709.github.io --only-categories=performance --chrome-flags="--headless"
```

#### 2. セキュリティスキャン
```bash
# 脆弱性チェック
npm audit --audit-level=moderate

# 依存関係更新確認
npm outdated

# セキュリティヘッダーチェック
curl -I https://kei-adachi0709.github.io | grep -i "x-"
```

#### 3. バックアップ検証
```bash
# バックアップファイル整合性確認
sha256sum portfolio-backup-$(date +%Y%m%d).tar.gz > backup-checksum.txt

# バックアップファイルサイズ確認
ls -lh backups/ | tail -10
```

### 📅 週次メンテナンス (手動)

#### 1. 包括的パフォーマンステスト
```bash
# 週次パフォーマンス監査
npm run perf 2>&1 | tee reports/weekly-$(date +%Y%m%d).log

# 競合サイト比較
npm run benchmark:competitors

# Core Web Vitals 履歴確認
npm run webvitals:history
```

#### 2. セキュリティ監査
```bash
# 包括的セキュリティスキャン
npm run security:full-scan

# CSP違反ログ確認
grep "Content-Security-Policy" /var/log/nginx/access.log

# 不正アクセス試行確認
grep "40[0-9]" /var/log/nginx/access.log | tail -50
```

#### 3. 依存関係管理
```bash
# 依存関係更新
npm update
npm audit fix

# 未使用パッケージ確認
npm-check-unused

# ライセンス確認
license-checker --summary
```

### 📅 月次メンテナンス (手動)

#### 1. 包括的システム監査
```bash
# システム全体監査
npm run audit:comprehensive

# パフォーマンス履歴分析
npm run analytics:monthly-report

# セキュリティ態勢評価
npm run security:posture-assessment
```

#### 2. バックアップ検証・整理
```bash
# 古いバックアップの整理
find backups/ -name "*.tar.gz" -mtime +90 -delete

# バックアップ復元テスト
mkdir test-restore
tar -xzf backups/portfolio-backup-latest.tar.gz -C test-restore/
cd test-restore && npm install && npm run build
```

#### 3. ドキュメント更新
```bash
# README.md 更新確認
git log --since="1 month ago" --oneline --grep="README"

# セキュリティポリシー見直し
git log --since="3 months ago" --oneline SECURITY.md

# ライセンス・依存関係ドキュメント更新
npm run docs:update
```

---

## 🚨 災害復旧手順

### 🔥 緊急時対応 (RTO: 30分以内)

#### シナリオ1: サイト完全停止
```bash
# 1. 状況確認 (5分)
curl -I https://kei-adachi0709.github.io
nslookup kei-adachi0709.github.io
ping kei-adachi0709.github.io

# 2. GitHub Pages 状態確認 (5分)
gh api repos/Kei-Adachi0709/Kei-Adachi0709.github.io/pages

# 3. 緊急復旧実行 (10分)
git push --force origin main
gh workflow run deploy.yml

# 4. 復旧確認 (10分)
sleep 300 && curl https://kei-adachi0709.github.io
```

#### シナリオ2: リポジトリ破損
```bash
# 1. バックアップからの復元
git clone backups/portfolio-backup-latest.git recovered-repo
cd recovered-repo

# 2. リモートリポジトリ再設定
git remote set-url origin https://github.com/Kei-Adachi0709/Kei-Adachi0709.github.io.git

# 3. 強制プッシュで復元
git push --force --all origin
git push --force --tags origin

# 4. GitHub Pages 再有効化
gh api repos/Kei-Adachi0709/Kei-Adachi0709.github.io/pages --method POST
```

#### シナリオ3: DNS・CDN 問題
```bash
# 1. DNS 設定確認
dig kei-adachi0709.github.io
nslookup kei-adachi0709.github.io 8.8.8.8

# 2. CDN キャッシュクリア
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

# 3. 代替アクセス方法提供
echo "185.199.108.153 kei-adachi0709.github.io" >> /etc/hosts
```

### 📋 復旧後チェックリスト
- [ ] **サイト表示確認**: 全ページが正常表示
- [ ] **機能テスト**: JavaScript・CSS・画像読み込み
- [ ] **パフォーマンス**: PageSpeed Insights 90+点維持
- [ ] **セキュリティ**: SSL証明書・セキュリティヘッダー確認
- [ ] **SEO**: サイトマップ・robots.txt アクセス可能
- [ ] **監視復旧**: アラート・通知システム正常化

---

## 🔍 監視・アラートシステム

### 📊 リアルタイム監視

#### 1. Uptime Robot 設定
```javascript
// uptime-robot-config.js
const monitors = [
  {
    friendly_name: "Kei Adachi Portfolio",
    url: "https://kei-adachi0709.github.io",
    type: 1, // HTTP(s)
    interval: 300, // 5分間隔
    timeout: 30
  }
];
```

#### 2. StatusCake 設定
```bash
# StatusCake API 設定
curl -H "API: ${STATUSCAKE_API_KEY}" \
     -d "WebsiteName=Kei Adachi Portfolio" \
     -d "WebsiteURL=https://kei-adachi0709.github.io" \
     -d "TestType=HTTP" \
     -d "CheckRate=300" \
     https://app.statuscake.com/API/Tests/Update
```

#### 3. Google Analytics リアルタイム監視
```javascript
// real-time-monitoring.js
setInterval(async () => {
  const response = await fetch('https://kei-adachi0709.github.io');
  const performanceMetrics = performance.getEntriesByType('navigation')[0];
  
  if (performanceMetrics.loadEventEnd > 3000) {
    sendAlert('Performance degradation detected');
  }
}, 60000); // 1分間隔
```

### 🚨 アラート設定

#### 1. Slack 通知
```yaml
# .github/workflows/monitoring.yml
- name: Site Down Alert
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    channel: '#alerts'
    title: '🚨 Portfolio Site Down!'
    text: 'Immediate attention required'
```

#### 2. Email アラート
```javascript
// email-alerts.js
const nodemailer = require('nodemailer');

async function sendCriticalAlert(message) {
  const transporter = nodemailer.createTransporter(/* config */);
  
  await transporter.sendMail({
    from: 'alerts@kei-adachi-portfolio.com',
    to: 'kei.adachi0709@example.com',
    subject: '🚨 CRITICAL: Portfolio Site Alert',
    text: message,
    priority: 'high'
  });
}
```

#### 3. SMS アラート (重要時)
```bash
# Twilio SMS アラート
curl -X POST https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json \
  --data-urlencode "To=+819012345678" \
  --data-urlencode "From=+15551234567" \
  --data-urlencode "Body=🚨 Portfolio Site Critical Alert: ${MESSAGE}" \
  -u ${TWILIO_SID}:${TWILIO_TOKEN}
```

---

## 📋 運用チェックリスト

### ✅ 日次チェック (自動化)
- [ ] **サイト稼働**: HTTP 200応答確認
- [ ] **SSL証明書**: 有効期限30日以上
- [ ] **セキュリティ**: 脆弱性スキャン実行
- [ ] **パフォーマンス**: Core Web Vitals "Good"
- [ ] **バックアップ**: 自動バックアップ実行確認

### ✅ 週次チェック (手動)
- [ ] **パフォーマンス監査**: PageSpeed Insights 90+点
- [ ] **セキュリティ監査**: 包括的スキャン実行
- [ ] **依存関係更新**: npm update・audit fix
- [ ] **ログ確認**: エラー・警告ログ確認
- [ ] **競合分析**: 他サイトとの比較

### ✅ 月次チェック (手動)
- [ ] **システム監査**: 包括的品質確認
- [ ] **バックアップ検証**: 復元テスト実行
- [ ] **ドキュメント更新**: README・セキュリティポリシー
- [ ] **ライセンス確認**: 依存関係ライセンス監査
- [ ] **運用改善**: プロセス見直し・最適化

---

## 📞 緊急時連絡先

### 🆘 エスカレーション体制
1. **Level 1**: 自動復旧試行 (5分)
2. **Level 2**: 開発者アラート (10分)
3. **Level 3**: 手動介入 (15分)
4. **Level 4**: 外部サポート (30分)

### 📧 連絡先一覧
- **技術責任者**: kei.adachi0709@example.com
- **緊急電話**: +81-90-XXXX-XXXX
- **Slack**: #portfolio-alerts
- **GitHub**: @Kei-Adachi0709

---

**🔄 継続的改善により、99.9%の可用性と30分以内の復旧時間を保証します。**

**最終更新**: 2025年6月18日  
**次回見直し**: 2025年9月18日  
**責任者**: 足立慧 (Kei Adachi)
