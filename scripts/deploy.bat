@echo off
REM Git自動コミット・デプロイスクリプト
echo Preparing for deployment...

REM 変更をステージング
echo Adding changes to git...
git add .

REM コミットメッセージを入力
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"

REM GitHubにプッシュ
echo Pushing to GitHub...
git push origin main

echo Deployment completed!
pause
