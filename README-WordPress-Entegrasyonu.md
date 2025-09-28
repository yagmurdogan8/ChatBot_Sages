# SAGES Chatbot - WordPress Entegrasyonu

## 📋 Genel Bakış

Bu chatbot, SAGES Yurtdışı Eğitim Danışmanlığı websitesi için özel olarak tasarlanmıştır. Müşterilerin sık sorulan sorularına otomatik cevap verir ve bilmediği konularda WhatsApp yönlendirmesi yapar.

## 🚀 Kurulum Adımları

### Yöntem 1: WordPress Plugin Olarak Kurulum

1. **Plugin Dosyalarını Hazırlayın:**
   - `sages-chatbot-plugin.php` dosyasını WordPress'in `wp-content/plugins/` klasörüne kopyalayın
   - `sages-chatbot.css` ve `sages-chatbot.js` dosyalarını aynı klasöre kopyalayın
   - Klasör yapısı şöyle olmalı:
     ```
     wp-content/plugins/sages-chatbot/
     ├── sages-chatbot-plugin.php
     ├── sages-chatbot.css
     └── sages-chatbot.js
     ```

2. **Plugin'i Aktifleştirin:**
   - WordPress admin paneline giriş yapın
   - "Eklentiler" > "Yüklü Eklentiler" bölümüne gidin
   - "SAGES Chatbot" eklentisini bulun ve "Etkinleştir" butonuna tıklayın

3. **Ayarları Yapın:**
   - "Ayarlar" > "SAGES Chatbot" menüsüne gidin
   - WhatsApp numarası, telefon, e-posta ve adres bilgilerini güncelleyin
   - "Kaydet" butonuna tıklayın

### Yöntem 2: Manuel Entegrasyon (Tema Dosyalarına Ekleme)

1. **CSS Dosyasını Yükleyin:**
   ```php
   // functions.php dosyasına ekleyin
   function sages_chatbot_styles() {
       wp_enqueue_style('sages-chatbot', get_template_directory_uri() . '/sages-chatbot.css', array(), '1.0');
   }
   add_action('wp_enqueue_scripts', 'sages_chatbot_styles');
   ```

2. **JavaScript Dosyasını Yükleyin:**
   ```php
   // functions.php dosyasına ekleyin
   function sages_chatbot_scripts() {
       wp_enqueue_script('sages-chatbot', get_template_directory_uri() . '/sages-chatbot.js', array('jquery'), '1.0', true);
   }
   add_action('wp_enqueue_scripts', 'sages_chatbot_scripts');
   ```

3. **HTML Kodunu Ekleyin:**
   - `footer.php` dosyasının `</body>` etiketinden önce aşağıdaki kodu ekleyin:

   ```html
   <!-- SAGES Chatbot HTML -->
   <button class="sages-chatbot-toggle" onclick="toggleSagesChatbot()">
       💬
   </button>

   <div class="sages-chatbot-container" id="sagesChatbotContainer">
       <div class="sages-chatbot-header">
           <h3>SAGES Danışman</h3>
           <button class="sages-close-btn" onclick="toggleSagesChatbot()">×</button>
       </div>
       
       <div class="sages-chatbot-messages" id="sagesChatbotMessages">
           <div class="sages-message sages-bot">
               <div class="sages-message-content">
                   Merhaba! 👋 SAGES Yurtdışı Eğitim Danışmanlığı'na hoş geldiniz! Size nasıl yardımcı olabilirim?
                   <div class="sages-quick-actions">
                       <button class="sages-quick-action-btn" onclick="sendSagesQuickMessage('Hangi ülkelerde eğitim alabilirim?')">Ülke Seçenekleri</button>
                       <button class="sages-quick-action-btn" onclick="sendSagesQuickMessage('Vize işlemleri nasıl yapılır?')">Vize İşlemleri</button>
                       <button class="sages-quick-action-btn" onclick="sendSagesQuickMessage('Fiyatlar hakkında bilgi alabilir miyim?')">Fiyat Bilgileri</button>
                       <button class="sages-quick-action-btn" onclick="sendSagesQuickMessage('İletişim bilgileriniz neler?')">İletişim</button>
                   </div>
               </div>
           </div>
       </div>
       
       <div class="sages-chatbot-input">
           <input type="text" id="sagesUserInput" placeholder="Mesajınızı yazın..." onkeypress="handleSagesKeyPress(event)">
           <button onclick="sendSagesMessage()">➤</button>
       </div>
   </div>

   <script>
       // SAGES Chatbot Configuration
       window.sagesChatbotConfig = {
           whatsappNumber: '905063309699',
           phoneNumber: '0312 431 3470',
           email: 'sages@sages.com.tr',
           address: 'Cumhuriyet Mah. Atatürk Bulvarı No: 83/16 Çankaya/Ankara'
       };
   </script>
   ```

## ⚙️ Özelleştirme

### İletişim Bilgilerini Değiştirme

Eğer plugin kullanıyorsanız:
- WordPress admin > Ayarlar > SAGES Chatbot

Eğer manuel entegrasyon yaptıysanız:
- `sages-chatbot.js` dosyasındaki `window.sagesChatbotConfig` objesini düzenleyin

### Renkleri Değiştirme

`sages-chatbot.css` dosyasındaki renk kodlarını düzenleyebilirsiniz:

```css
/* Ana renkler */
.sages-chatbot-header {
    background: linear-gradient(135deg, #1e3c72, #2a5298); /* Mavi tonları */
}

.sages-chatbot-toggle {
    background: linear-gradient(135deg, #1e3c72, #2a5298); /* Mavi tonları */
}

.sages-message.sages-user .sages-message-content {
    background: #2196f3; /* Mavi */
}
```

### Bilgi Tabanını Genişletme

`sages-chatbot.js` dosyasındaki `knowledgeBase` objesini düzenleyerek chatbot'un cevaplayabileceği soruları artırabilirsiniz.

## 📱 Responsive Tasarım

Chatbot tüm cihazlarda uyumlu çalışır:
- **Desktop:** Sağ alt köşede 350x500px boyutunda
- **Mobile:** Tam ekran modunda açılır

## 🔧 Sorun Giderme

### Chatbot Görünmüyor
1. CSS ve JS dosyalarının doğru yüklendiğini kontrol edin
2. Browser console'da hata olup olmadığını kontrol edin
3. jQuery'nin yüklü olduğundan emin olun

### Stil Sorunları
1. CSS dosyasının tema stillerinden sonra yüklendiğinden emin olun
2. CSS öncelik sırasını kontrol edin

### JavaScript Hataları
1. Browser console'da hata mesajlarını kontrol edin
2. jQuery'nin yüklü olduğundan emin olun
3. Dosya yollarının doğru olduğunu kontrol edin

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- **E-posta:** sages@sages.com.tr
- **Telefon:** +90 0312 431 3470
- **WhatsApp:** +90 506 330 96 99

## 🎯 Özellikler

- ✅ Otomatik cevap sistemi
- ✅ WhatsApp yönlendirmesi
- ✅ Responsive tasarım
- ✅ Kolay özelleştirme
- ✅ WordPress uyumlu
- ✅ Hızlı kurulum
- ✅ SEO dostu
- ✅ Mobil uyumlu

## 📊 İstatistikler

Chatbot şu konularda yardımcı olabilir:
- 20+ ülke hakkında bilgi
- 5 farklı eğitim programı
- Vize işlemleri
- Fiyat bilgileri
- İletişim bilgileri
- Genel danışmanlık soruları
