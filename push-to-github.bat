@echo off
chcp 65001 >nul
echo ========================================
echo  Push vers GitHub
echo ========================================
echo.

echo [1/6] Initialisation Git...
git init
echo.

echo [2/6] Ajout des fichiers...
git add .
echo.

echo [3/6] Commit initial...
git commit -m "first commit"
echo.

echo [4/6] Branche main...
git branch -M main
echo.

echo [5/6] Remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/jdabachine3378-svg/TP-6-Conception-d-une-API-.git
echo.

echo [6/6] Push vers GitHub...
echo ATTENTION: Authentification requise (utilisez un Personal Access Token)
git push -u origin main
echo.

echo ========================================
echo  TERMINE!
echo ========================================
pause

