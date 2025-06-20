# 🌐 カスタムドメイン設定ガイド

## 概要
GitHub Pages では、独自ドメイン（例: `your-portfolio.com`）を使用してサイトを公開できます。  
このガイドでは、カスタムドメインの設定方法を詳しく説明します。

---

## 📋 事前準備

### 必要なもの
- [ ] 独自ドメイン（取得済み）
- [ ] ドメイン管理画面へのアクセス
- [ ] GitHub Pages が正常に動作していること

### 推奨ドメイン名の例
- `kei-adachi.dev`
- `keiadachi-portfolio.com`
- `kei-adachi.me`
- `adachi-dev.jp`

---

## 🔧 Step 1: DNS設定（ドメイン管理画面）

### サブドメインを使用する場合（推奨）
```dns
# 例: www.your-domain.com または portfolio.your-domain.com

# CNAMEレコードを追加
Type: CNAME
Name: www (または portfolio)
Value: kei-adachi0709.github.io
TTL: 300 (または最小値)
```

### Apexドメインを使用する場合
```dns
# 例: your-domain.com

# Aレコードを追加（GitHub Pages の IP アドレス）
Type: A
Name: @ (または空欄)
Value: 185.199.108.153
TTL: 300

Type: A  
Name: @ (または空欄)
Value: 185.199.109.153
TTL: 300

Type: A
Name: @ (または空欄)
Value: 185.199.110.153
TTL: 300

Type: A
Name: @ (または空欄)
Value: 185.199.111.153
TTL: 300

# AAAAレコードも追加（IPv6対応）
Type: AAAA
Name: @ (または空欄)
Value: 2606:50c0:8000::153
TTL: 300

Type: AAAA
Name: @ (または空欄)
Value: 2606:50c0:8001::153
TTL: 300

Type: AAAA
Name: @ (または空欄)
Value: 2606:50c0:8002::153
TTL: 300

Type: AAAA
Name: @ (または空欄)
Value: 2606:50c0:8003::153
TTL: 300
```

---

## 📝 Step 2: CNAME ファイル設定

### 2-1. CNAME ファイル更新
```bash
# 現在のCNAMEファイルを編集
# c:\GitHubProject\Kei-Adachi0709.github.io\CNAME
```

**内容を以下に変更**:
```
your-domain.com
```
または
```
www.your-domain.com
```

### 2-2. リポジトリに反映
```bash
git add CNAME
git commit -m "🌐 Add custom domain configuration"
git push origin main
```

---

## ⚙️ Step 3: GitHub Pages 設定

### 3-1. GitHub Pages 設定画面
1. https://github.com/Kei-Adachi0709/Kei-Adachi0709.github.io/settings/pages
2. **Custom domain** フィールドに独自ドメインを入力
3. **Save** をクリック

### 3-2. DNS チェック待機
- GitHub が DNS 設定を確認（数分〜数時間）
- 確認完了後、HTTPS オプションが表示されます

### 3-3. HTTPS 強制設定
- **✅ Enforce HTTPS** にチェック
- SSL証明書の自動取得（Let's Encrypt）

---

## 🔍 Step 4: 設定確認・テスト

### 4-1. DNS 伝播確認
```bash
# Windows Command Prompt
nslookup your-domain.com

# 期待される結果:
# CNAME設定の場合: kei-adachi0709.github.io
# A設定の場合: 185.199.108.153 など
```

### 4-2. サイトアクセステスト
1. `http://your-domain.com` → 自動的に HTTPS にリダイレクト
2. `https://your-domain.com` → サイトが正常表示
3. `https://kei-adachi0709.github.io` → カスタムドメインにリダイレクト

---

## 🔄 Step 5: 設定ファイル更新

### 5-1. _config.yml 更新
```yaml
# c:\GitHubProject\Kei-Adachi0709.github.io\_config.yml

url: "https://your-domain.com"
baseurl: ""
```

### 5-2. package.json 更新
```json
{
  "homepage": "https://your-domain.com"
}
```

### 5-3. sitemap.xml 更新
```xml
<!-- すべてのURL を新しいドメインに変更 -->
<loc>https://your-domain.com/</loc>
```

### 5-4. robots.txt 更新
```txt
Sitemap: https://your-domain.com/sitemap.xml
```

### 5-5. 変更をデプロイ
```bash
git add .
git commit -m "🌐 Update configurations for custom domain"
git push origin main
```

---

## 🎯 SEO対策強化

### Google Search Console 登録
1. https://search.google.com/search-console
2. **新しいドメイン**を登録
3. サイトマップ送信: `https://your-domain.com/sitemap.xml`

### Google Analytics 設定更新
```javascript
// アナリティクス設定でドメインを更新
// 新しいドメインからのトラッキングを開始
```

---

## 🆘 トラブルシューティング

### ❌ "Domain's DNS record could not be retrieved"
**原因**: DNS設定の伝播が未完了  
**解決策**: 
```bash
# DNS伝播確認ツールを使用
# https://www.whatsmydns.net/
# 全世界での伝播状況を確認
```

### ❌ SSL証明書エラー
**原因**: HTTPS設定が未完了  
**解決策**:
1. HTTPS強制設定を一時的に無効化
2. 24時間待機
3. 再度 HTTPS強制設定を有効化

### ❌ サイトが表示されない
**チェック項目**:
```bash
# 1. DNS設定確認
nslookup your-domain.com

# 2. GitHub Pages Status確認
# https://www.githubstatus.com/

# 3. ブラウザキャッシュクリア
# Ctrl+Shift+R (Windows)
```

---

## 🔐 セキュリティ強化

### DNS セキュリティ
- **DNSSEC**: ドメインレジストラで有効化
- **CAA レコード**: SSL証明書発行制限
```dns
Type: CAA
Name: @
Value: 0 issue "letsencrypt.org"
```

### HTTP セキュリティヘッダー
`.github/workflows/deploy.yml` に追加済み:
- HSTS (HTTP Strict Transport Security)
- CSP (Content Security Policy)
- X-Frame-Options

---

## 📊 パフォーマンス最適化

### CDN活用
カスタムドメイン使用時は、GitHub Pages の CDN が自動適用されます:
- **地理的分散**: 世界中のエッジサーバー
- **自動キャッシュ**: 静的ファイルの高速配信
- **圧縮**: Gzip/Brotli 自動圧縮

### キャッシュ戦略
```http
# 自動設定されるヘッダー例
Cache-Control: max-age=600
ETag: "abc123"
Last-Modified: Wed, 18 Jun 2025 12:00:00 GMT
```

---

## 💰 費用目安

### ドメイン取得費用
- `.com`: 年間 1,000〜2,000円
- `.dev`: 年間 2,000〜3,000円  
- `.me`: 年間 2,000〜4,000円
- `.jp`: 年間 3,000〜5,000円

### その他費用
- **GitHub Pages**: 無料
- **SSL証明書**: 無料（Let's Encrypt）
- **DNS管理**: 通常、ドメイン費用に含まれる

---

## ✅ 完了チェックリスト

- [ ] DNS設定完了（A/CNAMEレコード）
- [ ] CNAME ファイル設定完了
- [ ] GitHub Pages カスタムドメイン設定完了
- [ ] HTTPS強制設定完了
- [ ] SSL証明書取得完了
- [ ] 設定ファイル更新完了（_config.yml等）
- [ ] サイト正常表示確認完了
- [ ] Google Search Console 登録完了
- [ ] パフォーマンステスト合格

**🎉 カスタムドメイン設定完了！プロフェッショナルなポートフォリオサイトの完成です！**
