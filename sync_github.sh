#!/bin/bash
echo "GitHub Synchronization Tool"
echo "=========================="

echo
echo "Current git status:"
git status

echo
echo "Checking remote repositories:"
git remote -v

echo
echo "Fetching latest changes from GitHub..."
git fetch origin

echo
echo "Differences between local and remote:"
git diff --stat origin/main

echo
read -p "Do you want to pull the latest changes from GitHub? (y/n): " pull
if [[ $pull == "y" || $pull == "Y" ]]; then
    git pull origin main
fi

echo
read -p "Do you have changes to commit and push? (y/n): " push
if [[ $push == "y" || $push == "Y" ]]; then
    read -p "Enter commit message: " message
    git add .
    git commit -m "$message"
    git push origin main
fi

echo
echo "Synchronization complete!"
