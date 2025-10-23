@echo off
echo ========================================
echo    SAGES Chatbot WordPress Kurulum
echo ========================================
echo.

echo WordPress plugin klasoru olusturuluyor...
if not exist "sages-chatbot" mkdir sages-chatbot

echo Dosyalar kopyalaniyor...
copy "sages-chatbot-plugin.php" "sages-chatbot\"
copy "sages-chatbot.js" "sages-chatbot\"
copy "sages-chatbot.css" "sages-chatbot\"
copy "README-WordPress-Installation.md" "sages-chatbot\"

echo.
echo ========================================
echo    Kurulum Tamamlandi!
echo ========================================
echo.
echo Plugin dosyalari 'sages-chatbot' klasorunde hazir.
echo.
echo WordPress'e kurulum icin:
echo 1. 'sages-chatbot' klasorunu ZIP olarak sikistirin
echo 2. WordPress Admin Panel > Eklentiler > Yeni Ekle
echo 3. ZIP dosyasini yukleyin ve etkinlestirin
echo 4. Ayarlar > SAGES Chatbot > Ayarlari yapin
echo.
echo VEYA
echo.
echo Manuel kurulum icin:
echo 1. 'sages-chatbot' klasorundeki dosyalari
echo    /wp-content/plugins/sages-chatbot/ klasorune kopyalayin
echo 2. WordPress Admin Panel > Eklentiler > Etkinlestir
echo 3. Ayarlar > SAGES Chatbot > Ayarlari yapin
echo.
pause
