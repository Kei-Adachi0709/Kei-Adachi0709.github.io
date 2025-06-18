# パフォーマンステスト手順書

## 🎯 目標
- **Google PageSpeed Insights: 90点以上**
- **Core Web Vitals: すべて"Good"評価**
- **Lighthouse Performance: 90点以上**
- **就活用途での最適なユーザーエクスペリエンス**

## 📋 テスト手順

### 1. Google PageSpeed Insights テスト

#### 1.1 テスト実行
```bash
# URLでテスト実行
https://pagespeed.web.dev/

# テスト対象URL
https://kei-adachi0709.github.io/
```

#### 1.2 確認項目
- **Performance スコア**: 90点以上
- **Accessibility スコア**: 95点以上  
- **Best Practices スコア**: 95点以上
- **SEO スコア**: 95点以上

#### 1.3 Core Web Vitals チェック
- **LCP (Largest Contentful Paint)**: 2.5秒以下
- **FID (First Input Delay)**: 100ms以下
- **CLS (Cumulative Layout Shift)**: 0.1以下

### 2. Lighthouse テスト（Chrome DevTools）

#### 2.1 テスト実行手順
```bash
1. Chrome DevTools を開く (F12)
2. "Lighthouse" タブを選択
3. "Performance" にチェック
4. "Mobile" または "Desktop" を選択
5. "Generate report" をクリック
```

#### 2.2 詳細確認項目
- **First Contentful Paint**: 1.8秒以下
- **Speed Index**: 3.4秒以下
- **Time to Interactive**: 3.8秒以下
- **Total Blocking Time**: 200ms以下

### 3. WebPageTest テスト

#### 3.1 テスト実行
```bash
# URLでテスト実行
https://www.webpagetest.org/

# 設定
- Test Location: Tokyo, Japan
- Browser: Chrome
- Connection: Cable
```

#### 3.2 確認項目
- **Load Time**: 3秒以下
- **First Byte Time**: 600ms以下
- **Start Render**: 2秒以下
- **Speed Index**: 3000以下

### 4. GTmetrix テスト

#### 4.1 テスト実行
```bash
https://gtmetrix.com/

# 設定
- Test Server: Vancouver, Canada
- Browser: Chrome (Desktop)
```

#### 4.2 確認項目
- **Performance Score**: A等級
- **Structure Score**: A等級
- **Page Load Time**: 3秒以下
- **Total Page Size**: 3MB以下

### 5. モバイル最適化テスト

#### 5.1 Google Mobile-Friendly Test
```bash
https://search.google.com/test/mobile-friendly

# テスト項目
- モバイルフレンドリー判定
- タップターゲットサイズ
- ビューポート設定
- フォントサイズ
```

#### 5.2 Chrome DevTools モバイルシミュレーション
```bash
1. Chrome DevTools を開く
2. Device Toolbar をON (Ctrl+Shift+M)
3. 各デバイスでテスト:
   - iPhone SE
   - iPhone 12 Pro
   - Samsung Galaxy S20
   - iPad
```

### 6. セキュリティテスト

#### 6.1 Mozilla Observatory
```bash
https://observatory.mozilla.org/

# 確認項目
- セキュリティヘッダー設定
- SSL/TLS設定
- コンテンツセキュリティポリシー
- セキュリティスコア: A等級
```

#### 6.2 内蔵セキュリティテスト
```bash
1. サイトのSecurityセクションにアクセス
2. "セキュリティテスト実行"をクリック
3. "セキュリティスコア計測"をクリック
4. スコア90点以上を確認
```

### 7. SEOテスト

#### 7.1 構造化データテスト
```bash
https://search.google.com/test/rich-results

# 確認項目
- Person スキーマ
- WebSite スキーマ
- ProfilePage スキーマ
- エラーなし
```

#### 7.2 Open Graph テスト
```bash
https://developers.facebook.com/tools/debug/

# 確認項目
- OGP画像表示
- タイトル・説明文
- エラーなし
```

#### 7.3 Twitter Card テスト
```bash
https://cards-dev.twitter.com/validator

# 確認項目
- カード画像表示
- タイトル・説明文
- エラーなし
```

### 8. アクセシビリティテスト

#### 8.1 WAVE テスト
```bash
https://wave.webaim.org/

# 確認項目
- エラー: 0件
- 警告: 最小限
- 機能: 適切に実装
```

#### 8.2 axe DevTools
```bash
1. Chrome拡張機能 "axe DevTools" をインストール
2. DevTools > axe タブ
3. "Scan ALL of my page" 実行
4. エラー0件を確認
```

## 🎯 パフォーマンス改善チェックリスト

### ✅ 実装済み最適化
- [x] **画像最適化**
  - [x] WebP形式対応
  - [x] 遅延読み込み (Lazy Loading)
  - [x] レスポンシブ画像 (srcset)
  - [x] 適切なサイズ設定

- [x] **CSS最適化**
  - [x] クリティカルCSS分離
  - [x] 非クリティカルCSS遅延読み込み
  - [x] フォント最適化 (font-display: swap)

- [x] **JavaScript最適化**
  - [x] 非同期読み込み (defer)
  - [x] コード分割
  - [x] パフォーマンス監視

- [x] **リソース最適化**
  - [x] DNS プリフェッチ
  - [x] リソースプリロード
  - [x] CDN活用

- [x] **SEO対策**
  - [x] 構造化データ (JSON-LD)
  - [x] メタタグ最適化
  - [x] サイトマップ
  - [x] robots.txt

### 📊 期待されるスコア

| テスト項目 | 目標スコア | 期待値 |
|-----------|-----------|--------|
| PageSpeed Insights (Mobile) | 90+ | 92-95 |
| PageSpeed Insights (Desktop) | 95+ | 96-98 |
| Lighthouse Performance | 90+ | 92-96 |
| Lighthouse SEO | 95+ | 98-100 |
| Lighthouse Accessibility | 95+ | 96-98 |
| Lighthouse Best Practices | 95+ | 96-100 |

### 🔧 追加改善案（必要に応じて）

1. **Service Worker 実装**
   - オフライン対応
   - キャッシュ戦略最適化

2. **HTTP/2 Push**
   - クリティカルリソースのプッシュ

3. **画像生成自動化**
   - WebP自動変換
   - 複数サイズ自動生成

4. **コンテンツ圧縮**
   - Brotli/Gzip圧縮

## 📈 継続的監視

### 定期テスト（週次）
- Google PageSpeed Insights
- Core Web Vitals監視
- セキュリティスコア確認

### 月次レビュー
- 競合サイト比較
- 新しい最適化手法の調査
- ユーザーフィードバック分析

---

**注意**: 実際のテスト実行前に、すべての画像ファイル（WebP形式）とアイコンファイルを準備してください。
