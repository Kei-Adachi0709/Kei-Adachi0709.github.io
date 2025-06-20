# Scripts Directory

このフォルダには開発・デプロイメント用のスクリプトが含まれています。

## ファイル一覧

### build.bat
- **目的**: プロジェクトのビルド処理
- **機能**: 
  - npm依存関係のインストール
  - Webpackによるバンドル実行
- **使用方法**: `.\scripts\build.bat`

### dev-server.bat
- **目的**: 開発サーバーの起動
- **機能**: 
  - npm startによる開発サーバー起動
- **使用方法**: `.\scripts\dev-server.bat`

### deploy.bat
- **目的**: Git自動コミット・デプロイ
- **機能**: 
  - 変更のgit add
  - コミットメッセージ入力
  - GitHub Pagesへの自動プッシュ
- **使用方法**: `.\scripts\deploy.bat`

## 注意事項

- 実行前にNode.js、npm、gitが正しくインストールされていることを確認してください
- deploy.batを使用する前に、変更内容を確認してください
- 開発サーバーは`Ctrl+C`で停止できます
