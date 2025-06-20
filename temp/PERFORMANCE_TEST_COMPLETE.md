# 📊 完全版パフォーマンステスト手順書
**Google PageSpeed Insights 90点以上達成・就活最適化ガイド**

## 🎯 最終目標スコア
- **Performance**: 90点以上 ⭐
- **Accessibility**: 95点以上 ⭐⭐
- **Best Practices**: 95点以上 ⭐⭐
- **SEO**: 95点以上 ⭐⭐⭐

## 🚀 自動テスト実行コマンド

### 包括的パフォーマンステスト
```bash
# 全体的なビルド・最適化・テストの実行
npm run perf

# 段階的テスト実行
npm run build                    # 本番ビルド
npm run optimize                 # 画像・CSS最適化
npm run test:lighthouse          # Lighthouse テスト
npm run test:pagespeed          # PageSpeed Insights テスト
npm run test:accessibility       # アクセシビリティテスト
npm run test:seo                # SEO検証
```

### 開発中のクイックテスト
```bash
# 開発サーバー起動
npm run dev

# 別ターミナルで軽量テスト
npm run test:lighthouse -- --preset=perf
```

## 📈 手動テスト詳細手順

### 1. Google PageSpeed Insights
**URL**: https://pagespeed.web.dev/

#### 手順:
1. サイトURL入力: `https://kei-adachi0709.github.io`
2. 「分析」をクリック
3. モバイル・デスクトップ両方をテスト
4. 各スコアを記録

#### 目標スコア:
```
モバイル:
├─ Performance: 90+ 点
├─ Accessibility: 95+ 点  
├─ Best Practices: 95+ 点
└─ SEO: 95+ 点

デスクトップ:
├─ Performance: 95+ 点
├─ Accessibility: 95+ 点
├─ Best Practices: 95+ 点
└─ SEO: 95+ 点
```

#### Core Web Vitals 目標値:
- **LCP**: < 2.5秒 (理想: < 1.5秒)
- **FID**: < 100ms (理想: < 50ms)  
- **CLS**: < 0.1 (理想: < 0.05)

### 2. Lighthouse CI テスト
```bash
# CLI実行（詳細設定）
lighthouse https://kei-adachi0709.github.io \
  --config-path=./lighthouse.config.js \
  --output=html,json \
  --output-path=./reports/lighthouse \
  --chrome-flags="--headless --no-sandbox" \
  --form-factor=mobile \
  --throttling.cpuSlowdownMultiplier=4 \
  --throttling.requestLatencyMs=150
```

#### Chrome DevTools 手順:
1. F12 → Lighthouse タブ
2. Performance + Accessibility + Best Practices + SEO を選択
3. Mobile device 選択
4. 「Generate report」実行
5. 結果をスクリーンショット保存

### 3. WebPageTest 詳細分析
**URL**: https://www.webpagetest.org/

#### 設定:
- **Test Location**: Tokyo, Japan  
- **Browser**: Chrome
- **Connection**: 4G (1.6 Mbps down, 768 Kbps up)
- **Number of Tests**: 3回実行
- **Repeat View**: First View + Repeat View

#### 確認指標:
```
Performance Metrics:
├─ TTFB (Time to First Byte): < 200ms
├─ Start Render: < 1.5秒
├─ Speed Index: < 3.0秒  
├─ LCP: < 2.5秒
├─ TTI (Time to Interactive): < 3.5秒
└─ Total Blocking Time: < 300ms

Resource Analysis:
├─ Total Requests: < 50個
├─ Total Size: < 1MB
├─ Image Size: < 500KB
├─ JS Size: < 200KB
└─ CSS Size: < 100KB
```

### 4. Real User Monitoring (RUM)
自社実装の`performance.js`を使用:

```javascript
// ブラウザコンソールで確認
PerformanceMonitor.getMetrics();
PerformanceMonitor.getCoreWebVitals();
```

## 🔧 最適化チェックリスト

### Phase 1: Critical Rendering Path
- [ ] **HTML最小化**: HTMLコメント削除、空白圧縮
- [ ] **Critical CSS**: Above-the-fold CSS分離
- [ ] **CSS最小化**: 未使用CSS削除、圧縮
- [ ] **JavaScript分割**: Critical vs Non-critical
- [ ] **リソースプリロード**: 重要リソースの事前読み込み

### Phase 2: Image Optimization
- [ ] **WebP変換**: 全画像のWebP対応
- [ ] **レスポンシブ画像**: srcset, sizes属性設定
- [ ] **遅延読み込み**: Intersection Observer実装
- [ ] **圧縮最適化**: 品質85%での圧縮
- [ ] **適切なサイズ**: デバイス別最適サイズ
- [ ] **プレースホルダー**: レイアウトシフト防止

### Phase 3: JavaScript Optimization  
- [ ] **コード分割**: 動的import実装
- [ ] **Tree Shaking**: 未使用コード削除
- [ ] **Minification**: 変数名短縮、空白削除
- [ ] **非同期読み込み**: defer, async属性
- [ ] **Service Worker**: キャッシュ戦略実装
- [ ] **Web Workers**: 重い処理の分離

### Phase 4: Font Optimization
- [ ] **WOFF2使用**: 最新フォント形式
- [ ] **font-display: swap**: フォールバック表示
- [ ] **プリロード**: 重要フォントの事前読み込み
- [ ] **サブセット化**: 必要文字のみ読み込み
- [ ] **フォント最小化**: ファイルサイズ削減

### Phase 5: Caching Strategy
- [ ] **Browser Cache**: 適切なCache-Control設定
- [ ] **Service Worker**: オフライン対応
- [ ] **CDN準備**: 静的リソース配信最適化
- [ ] **ETags**: リソース変更検出
- [ ] **Gzip/Brotli**: サーバー圧縮準備

## 🚨 トラブルシューティング

### Performance < 90 の対策

#### スコア 80-89 の場合:
```bash
# 画像最適化の再実行
npm run images:optimize
npm run images:webp

# 未使用リソースの確認
npm run build:analyze
```

**主な問題と解決策:**
1. **画像サイズ過大** → WebP変換 + 圧縮
2. **JavaScript実行時間** → コード分割 + 遅延読み込み  
3. **CSS読み込み遅延** → Critical CSS分離
4. **フォント読み込み** → プリロード + font-display

#### スコア 70-79 の場合:
```bash
# 全面的な最適化
npm run clean
npm run build
npm run optimize
```

**集中対策:**
1. **LCP改善**: ヒーロー画像の最適化
2. **TBT削減**: JavaScript実行量削減
3. **CLS防止**: サイズ属性の適切な設定
4. **FCP向上**: Critical CSS最適化

#### スコア < 70 の場合:
**根本的な見直しが必要:**
1. 画像戦略の全面見直し
2. JavaScript アーキテクチャの見直し
3. 外部リソース依存の削減
4. サーバー側最適化の検討

### Accessibility < 95 の対策
```bash
# アクセシビリティチェック
npm run test:accessibility
```

**チェック項目:**
- [ ] **色のコントラスト**: 4.5:1以上
- [ ] **フォーカス管理**: Tab順序の論理性
- [ ] **セマンティックHTML**: 適切なタグ使用
- [ ] **alt属性**: 全画像に適切な代替テキスト
- [ ] **見出し構造**: h1-h6の論理的階層
- [ ] **ランドマーク**: main, nav, footer等の使用

### SEO < 95 の対策
```bash
# SEO検証
npm run test:seo
```

**最適化項目:**
- [ ] **メタディスクリプション**: 155文字以内
- [ ] **タイトルタグ**: 60文字以内、キーワード含有
- [ ] **見出し構造**: H1は1つ、論理的階層
- [ ] **内部リンク**: 適切なアンカーテキスト
- [ ] **画像alt**: SEOキーワード含有
- [ ] **構造化データ**: JSON-LD実装
- [ ] **sitemap.xml**: 最新状態維持
- [ ] **robots.txt**: 適切なクロール指示

## 📊 レポート生成・管理

### 自動レポート生成
```bash
# 月次包括レポート
npm run perf 2>&1 | tee "reports/monthly-$(date +%Y%m).log"

# 週次簡易レポート  
npm run test:lighthouse --silent >> "reports/weekly-lighthouse.csv"

# 履歴管理
echo "$(date),Mobile,$(npm run test:pagespeed --silent | grep -o '[0-9]*')" >> performance-history.csv
```

### レポート保存場所
```
reports/
├── lighthouse.html          # 詳細Lighthouseレポート
├── lighthouse.json          # JSON形式データ
├── bundle-analysis.html     # Webpack Bundle Analyzer
├── accessibility.json       # アクセシビリティ結果
├── performance-history.csv  # パフォーマンス履歴
└── monthly-YYYYMM.log       # 月次包括レポート
```

### KPI ダッシュボード (推奨)
Google Sheets / Excel で以下を管理:
```
日付 | Mobile Perf | Desktop Perf | LCP | FID | CLS | 改善メモ
-----|-------------|--------------|-----|-----|-----|----------
2024/06/18 | 92 | 98 | 1.2s | 45ms | 0.05 | 画像最適化完了
```

## 🎯 就活アピールポイント

### 技術力証明書類
1. **PageSpeed Insights スクリーンショット** (90点以上)
2. **Lighthouse レポート** (詳細分析結果)
3. **Core Web Vitals達成証明**
4. **パフォーマンス改善履歴**

### 面接でのアピール内容
```
「ポートフォリオサイトでGoogle PageSpeed Insights 90点以上を達成し、
Core Web Vitalsすべてで"Good"評価を獲得しました。

具体的な最適化内容:
• WebP画像 + 遅延読み込みによるLCP 1.5秒以下達成
• JavaScript分割読み込みによるTBT 200ms以下達成  
• Critical CSS分離によるFCP 1.0秒以下達成
• Service Worker実装によるオフライン対応

これらの技術により、ユーザーエクスペリエンスとSEOの両方を
高いレベルで実現しています。」
```

### 継続的改善アピール
- 週次パフォーマンス監視の実施
- 新技術導入による継続的な最適化
- ユーザビリティテストに基づく改善
- アクセシビリティ対応による包括的品質向上

## 📅 定期実行スケジュール

### 日次 (自動)
```bash
# GitHub Actions で自動実行
# .github/workflows/deploy.yml で設定済み
```

### 週次 (手動確認)
```bash
# 毎週月曜日 9:00実行
npm run perf >> weekly-$(date +%Y%m%d).log
```

### 月次 (包括確認)
- [ ] 競合サイトとの比較分析
- [ ] 新技術トレンドの調査・導入検討
- [ ] パフォーマンス履歴の分析
- [ ] 改善施策の効果測定

---

**📌 重要**: 就活においてPageSpeed Insights 90点以上は、**技術力の客観的証明**として非常に重要です。採用担当者は、このスコアからあなたの技術的習熟度を判断します。

**🚀 次のマイルストーン**: 
- Phase 4完了時: 全指標90点以上達成
- 就活開始前: 安定的な高スコア維持確認
- 面接準備: パフォーマンス改善ストーリーの整理

**最終更新**: 2025年6月18日 | **責任者**: 足立慧 (Kei Adachi)
