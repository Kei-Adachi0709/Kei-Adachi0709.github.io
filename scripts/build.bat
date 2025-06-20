@echo off
REM プロジェクトビルドスクリプト
echo Building project...

REM Node.jsの依存関係をインストール
echo Installing dependencies...
npm install

REM Webpackでバンドル
echo Running webpack build...
npm run build

REM 完了メッセージ
echo Build completed successfully!
pause
