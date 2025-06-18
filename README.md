# Kei Adachi Portfolio

GitHub Pages用ポートフォリオサイト

## プロジェクト概要

現代的でレスポンシブなポートフォリオウェブサイト。フロントエンド開発者としてのスキルとプロジェクトを紹介します。

## 技術スタック

- **HTML5** - セマンティックなマークアップ
- **CSS3** - モダンなスタイリング、CSS Grid、Flexbox
- **JavaScript (ES6+)** - インタラクティブな機能
- **SCSS** - CSS拡張（Phase 2で導入予定）
- **Webpack** - モジュールバンドラー（Phase 2で導入予定）

## ライブラリ・ツール

- **AOS** - スクロールアニメーション
- **Swiper** - スライダー・カルーセル
- **Typed.js** - タイピングアニメーション
- **RemixIcon** - アイコンライブラリ
- **Google Fonts** - フォント

## フォルダ構造

```
Kei-Adachi0709.github.io/
├── assets/
│   ├── css/
│   │   └── main.css           # メインスタイルシート
│   ├── scss/                  # SCSS開発用（Phase 2）
│   │   └── main.scss
│   ├── js/
│   │   └── main.js            # メインJavaScript
│   ├── images/                # 画像ファイル
│   └── fonts/                 # フォントファイル
├── index.html                 # メインHTMLファイル
├── package.json              # プロジェクト設定・依存関係
├── .gitignore               # Git除外設定
└── README.md                # プロジェクト説明
```

## 機能

### Phase 1（完了）
- [x] プロジェクト初期設定
- [x] 基本的なHTML構造
- [x] レスポンシブCSSフレームワーク
- [x] モバイルナビゲーション
- [x] ダークモード機能
- [x] スムーススクロール
- [x] ページローダー

### Phase 2（予定）
- [ ] ヒーローセクション
- [ ] アバウトセクション
- [ ] スキルセクション
- [ ] プロジェクトギャラリー
- [ ] コンタクトフォーム
- [ ] アニメーション実装

### Phase 3（予定）
- [ ] パフォーマンス最適化
- [ ] SEO対応
- [ ] PWA化
- [ ] アクセシビリティ改善

## 開発環境セットアップ

### 前提条件
- Node.js (v16以上)
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/Kei-Adachi0709/Kei-Adachi0709.github.io.git
cd Kei-Adachi0709.github.io

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### ビルド

```bash
# プロダクション用ビルド
npm run build

# CSS/SCSSビルド
npm run css:build

# CSSウォッチモード
npm run css:watch
```

## デプロイ

GitHub Pagesへの自動デプロイ設定：

```bash
# GitHub Pagesにデプロイ
npm run deploy
```

## パフォーマンス目標

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## ブラウザサポート

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- iOS Safari (iOS 12+)
- Chrome Android (最新版)

## アクセシビリティ

- WCAG 2.1 AA準拠
- キーボードナビゲーション対応
- スクリーンリーダー対応
- カラーコントラスト比4.5:1以上

## ライセンス

MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照

## 作者

**Kei Adachi**
- GitHub: [@Kei-Adachi0709](https://github.com/Kei-Adachi0709)
- Email: kei.adachi0709@example.com

## 貢献

プルリクエストやイシューの報告を歓迎します。

## 更新履歴

### v1.0.0 (2025-06-18)
- プロジェクト初期設定完了
- 基本構造とスタイル実装
- レスポンシブデザイン対応
- ダークモード機能追加
