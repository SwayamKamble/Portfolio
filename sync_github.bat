@echo off
echo GitHub Synchronization Tool
echo ==========================

echo.
echo Current git status:
git status

echo.
echo Checking remote repositories:
git remote -v

echo.
echo Fetching latest changes from GitHub...
git fetch origin

echo.
echo Differences between local and remote:
git diff --stat origin/main

echo.
set /p pull="Do you want to pull the latest changes from GitHub? (y/n): "
if /i "%pull%"=="y" (
    git pull origin main
)

echo.
set /p push="Do you have changes to commit and push? (y/n): "
if /i "%push%"=="y" (
    set /p message="Enter commit message: "
    git add .
    git commit -m "%message%"
    git push origin main
)

echo.
echo Synchronization complete!
pause
