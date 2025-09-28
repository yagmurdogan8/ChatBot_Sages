// SAGES Chatbot JavaScript
(function($) {
    'use strict';
    
    // Chatbot state
    let isTyping = false;
    
    // Knowledge base for SAGES
    const knowledgeBase = {
        // Ülke bilgileri
        "ülke": {
            "birleşik krallık": "🇬🇧 <strong>Birleşik Krallık Eğitimi:</strong><br/>• Dil sınavı: IELTS 6.0-7.0 veya TOEFL 80-100<br/>• Başvuru: UCAS sistemi (Ekim-Ocak arası)<br/>• Eğitim süresi: Lisans 3 yıl, Yüksek lisans 1 yıl<br/>• Yıllık eğitim ücreti: £15,000-35,000<br/>• Aylık yaşam maliyeti: £800-1,200<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: London, Manchester, Edinburgh",
            "almanya": "🇩🇪 <strong>Almanya Eğitimi:</strong><br/>• Dil sınavı: TestDaF TDN 4 veya DSH 2<br/>• Başvuru: uni-assist (Temmuz-Eylül)<br/>• Eğitim süresi: Lisans 3 yıl, Yüksek lisans 2 yıl<br/>• Yıllık eğitim ücreti: Devlet üniversiteleri ücretsiz (sadece semester fee €150-300)<br/>• Aylık yaşam maliyeti: €700-1,000<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: Berlin, Munich, Hamburg",
            "kanada": "🇨🇦 <strong>Kanada Eğitimi:</strong><br/>• Dil sınavı: IELTS 6.0-6.5 veya TOEFL 80-90<br/>• Başvuru: Üniversiteye göre değişir (Ocak-Mart)<br/>• Eğitim süresi: Lisans 4 yıl, Yüksek lisans 1-2 yıl<br/>• Yıllık eğitim ücreti: $15,000-30,000<br/>• Aylık yaşam maliyeti: $1,000-1,500<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: Toronto, Vancouver, Montreal",
            "abd": "🇺🇸 <strong>ABD Eğitimi:</strong><br/>• Dil sınavı: IELTS 6.5-7.0 veya TOEFL 80-100<br/>• Akademik sınav: SAT (Lisans) veya GRE/GMAT (Yüksek lisans)<br/>• Başvuru: Common Application (Ocak-Mart)<br/>• Eğitim süresi: Lisans 4 yıl, Yüksek lisans 2 yıl<br/>• Yıllık eğitim ücreti: $20,000-60,000<br/>• Aylık yaşam maliyeti: $1,500-2,500<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: New York, Los Angeles, Boston",
            "fransa": "🇫🇷 <strong>Fransa Eğitimi:</strong><br/>• Dil sınavı: DELF B2 veya DALF C1<br/>• Başvuru: Campus France (Ocak-Mart)<br/>• Eğitim süresi: Lisans 3 yıl, Yüksek lisans 2 yıl<br/>• Yıllık eğitim ücreti: Devlet üniversiteleri €170-600<br/>• Aylık yaşam maliyeti: €800-1,200<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: Paris, Lyon, Toulouse",
            "italya": "🇮🇹 <strong>İtalya Eğitimi:</strong><br/>• Dil sınavı: CILS B2 veya CELI B2<br/>• Başvuru: Üniversiteye göre değişir (Mart-Mayıs)<br/>• Eğitim süresi: Lisans 3 yıl, Yüksek lisans 2 yıl<br/>• Yıllık eğitim ücreti: €1,000-4,000<br/>• Aylık yaşam maliyeti: €600-1,000<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: Milan, Rome, Florence",
            "polonya": "🇵🇱 <strong>Polonya Eğitimi:</strong><br/>• Dil sınavı: İngilizce B2 veya Lehçe B2<br/>• Başvuru: Üniversiteye göre değişir (Mart-Temmuz)<br/>• Eğitim süresi: Lisans 3 yıl, Yüksek lisans 2 yıl<br/>• Yıllık eğitim ücreti: €2,000-8,000<br/>• Aylık yaşam maliyeti: €400-700<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: Warsaw, Krakow, Gdansk",
            "macaristan": "🇭🇺 <strong>Macaristan Eğitimi:</strong><br/>• Dil sınavı: İngilizce B2 veya Macarca B2<br/>• Başvuru: Üniversiteye göre değişir (Mart-Haziran)<br/>• Eğitim süresi: Lisans 3-4 yıl, Yüksek lisans 2 yıl<br/>• Yıllık eğitim ücreti: €3,000-12,000<br/>• Aylık yaşam maliyeti: €500-800<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: Budapest, Debrecen, Szeged",
            "letonya": "🇱🇻 <strong>Letonya Eğitimi:</strong><br/>• Dil sınavı: İngilizce B2 veya Letonca B2<br/>• Başvuru: Üniversiteye göre değişir (Mart-Haziran)<br/>• Eğitim süresi: Lisans 3-4 yıl, Yüksek lisans 2 yıl<br/>• Yıllık eğitim ücreti: €2,000-6,000<br/>• Aylık yaşam maliyeti: €400-600<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: Riga, Daugavpils, Liepaja",
            "estonya": "🇪🇪 <strong>Estonya Eğitimi:</strong><br/>• Dil sınavı: İngilizce B2 veya Estonca B2<br/>• Başvuru: Üniversiteye göre değişir (Mart-Haziran)<br/>• Eğitim süresi: Lisans 3-4 yıl, Yüksek lisans 2 yıl<br/>• Yıllık eğitim ücreti: €2,000-8,000<br/>• Aylık yaşam maliyeti: €500-800<br/>• Çalışma izni: Haftalık 20 saat<br/>• Popüler şehirler: Tallinn, Tartu, Narva"
        },
        
        // Eğitim programları
        "program": {
            "lisans": "🎓 <strong>Lisans Eğitimi:</strong><br/>• Gereksinimler: Lise diploması, dil sınavı (IELTS/TOEFL), SAT/ACT (ABD için)<br/>• Başvuru süresi: 8-12 ay önceden<br/>• Eğitim süresi: 3-4 yıl<br/>• Popüler bölümler: İşletme, Mühendislik, Tıp, Hukuk, Sanat<br/>• Başvuru belgeleri: Transkript, dil sınavı, motivasyon mektubu, referans mektupları<br/>• SAGES desteği: Üniversite seçimi, başvuru süreci, vize işlemleri",
            "yüksek lisans": "🎓 <strong>Yüksek Lisans Eğitimi:</strong><br/>• Gereksinimler: Lisans diploması, dil sınavı, GRE/GMAT (bazı bölümler için)<br/>• Başvuru süresi: 6-8 ay önceden<br/>• Eğitim süresi: 1-2 yıl<br/>• Popüler bölümler: MBA, Mühendislik, Sosyal Bilimler, Sağlık<br/>• Başvuru belgeleri: Transkript, dil sınavı, CV, motivasyon mektubu, referans mektupları<br/>• SAGES desteği: Program seçimi, başvuru stratejisi, burs başvuruları",
            "doktora": "🎓 <strong>Doktora Eğitimi:</strong><br/>• Gereksinimler: Yüksek lisans diploması, araştırma önerisi, dil sınavı<br/>• Başvuru süresi: 12-18 ay önceden<br/>• Eğitim süresi: 3-5 yıl<br/>• Popüler alanlar: Fen Bilimleri, Sosyal Bilimler, Mühendislik, Tıp<br/>• Başvuru belgeleri: Transkript, araştırma önerisi, CV, referans mektupları, dil sınavı<br/>• SAGES desteği: Hoca bulma, araştırma önerisi yazma, burs başvuruları",
            "dil okulu": "🌍 <strong>Dil Okulu Eğitimi:</strong><br/>• Gereksinimler: Pasaport, başvuru formu (dil sınavı gerekmez)<br/>• Başvuru süresi: 2-3 ay önceden<br/>• Eğitim süresi: 2 hafta - 1 yıl<br/>• Popüler ülkeler: İngiltere, İrlanda, Malta, İskoçya, ABD, Kanada<br/>• Program türleri: Genel İngilizce, IELTS hazırlık, İş İngilizcesi, Akademik İngilizce<br/>• SAGES desteği: Okul seçimi, konaklama, vize işlemleri",
            "lise": "🎒 <strong>Lise Eğitimi:</strong><br/>• Gereksinimler: Ortaokul diploması, dil sınavı (bazı okullar için)<br/>• Başvuru süresi: 6-8 ay önceden<br/>• Eğitim süresi: 3-4 yıl<br/>• Popüler ülkeler: ABD, Kanada, İngiltere, Almanya<br/>• Program türleri: IB, A-Level, AP, Devlet lisesi<br/>• SAGES desteği: Okul seçimi, başvuru süreci, vize işlemleri, konaklama"
        },
        
        // Vize işlemleri
        "vize": {
            "öğrenci vizesi": "🛂 <strong>Öğrenci Vizesi:</strong><br/>• Gerekli belgeler: Kabul mektubu, finansal belgeler, sağlık sigortası, pasaport<br/>• Başvuru süresi: 2-3 ay<br/>• Finansal gereksinim: Eğitim + yaşam maliyetlerini karşılayacak miktar<br/>• Sağlık sigortası: Zorunlu (ülkeye göre değişir)<br/>• SAGES desteği: Belge hazırlama, başvuru süreci, randevu alma",
            "vize süreci": "📋 <strong>Vize Başvuru Süreci:</strong><br/>1️⃣ Üniversite kabulü alınması<br/>2️⃣ Finansal belgelerin hazırlanması<br/>3️⃣ Sağlık sigortası yaptırılması<br/>4️⃣ Vize başvuru formunun doldurulması<br/>5️⃣ Randevu alınması ve başvuru yapılması<br/>⏱️ Toplam süre: 2-3 ay<br/>✅ SAGES başarı oranı: %95+",
            "vize ücreti": "💰 <strong>Vize Ücretleri (2024):</strong><br/>• ABD: $160 (F-1 vizesi)<br/>• İngiltere: £363 (Student visa)<br/>• Almanya: €75 (Student visa)<br/>• Kanada: $150 CAD (Study permit)<br/>• Fransa: €99 (Student visa)<br/>• İtalya: €50 (Student visa)<br/>• Polonya: €80 (Student visa)<br/>⚠️ Ücretler değişebilir, güncel bilgi için iletişime geçin",
            "vize reddi": "❌ <strong>Vize Reddi Durumu:</strong><br/>• Yeniden başvuru yapabilirsiniz<br/>• Red sebebini öğrenin ve eksiklikleri tamamlayın<br/>• SAGES danışmanlığı ile başvuru stratejinizi gözden geçirin<br/>• Finansal belgelerinizi güçlendirin<br/>• Motivasyon mektubunuzu yeniden yazın<br/>• SAGES desteği: Red analizi ve yeniden başvuru stratejisi"
        },
        
        // Fiyat bilgileri
        "fiyat": {
            "danışmanlık": "💼 <strong>SAGES Danışmanlık Ücretleri:</strong><br/>• İlk danışmanlık: ÜCRETSİZ<br/>• Üniversite seçimi: ÜCRETSİZ<br/>• Başvuru süreci: ÜCRETSİZ<br/>• Vize işlemleri: Ücretli (detay için iletişime geçin)<br/>• Konaklama organizasyonu: Ücretli<br/>• 24/7 destek: ÜCRETSİZ",
            "eğitim maliyeti": "💰 <strong>Yıllık Eğitim Ücretleri (2024):</strong><br/>• Almanya: €150-300 (devlet üniversiteleri)<br/>• Fransa: €170-600 (devlet üniversiteleri)<br/>• ABD: $20,000-60,000<br/>• İngiltere: £15,000-35,000<br/>• Kanada: $15,000-30,000 CAD<br/>• İtalya: €1,000-4,000<br/>• Polonya: €2,000-8,000<br/>• Macaristan: €3,000-12,000",
            "yaşam maliyeti": "🏠 <strong>Aylık Yaşam Maliyetleri:</strong><br/>• ABD: $1,500-2,500<br/>• İngiltere: £800-1,200<br/>• Almanya: €700-1,000<br/>• Kanada: $1,000-1,500 CAD<br/>• Fransa: €800-1,200<br/>• İtalya: €600-1,000<br/>• Polonya: €400-700<br/>• Macaristan: €500-800<br/>• Letonya: €400-600<br/>• Estonya: €500-800"
        },
        
        // İletişim bilgileri
        "iletişim": {
            "adres": "Cumhuriyet Mah. Atatürk Bulvarı No: 83/16 Çankaya/Ankara",
            "telefon": "+90 0312 431 3470",
            "email": "sages@sages.com.tr",
            "whatsapp": "+90 506 330 96 99",
            "çalışma saatleri": "Pazartesi-Cuma: 09:00-18:00, Cumartesi: 09:00-14:00"
        },
        
        // Genel bilgiler
        "genel": {
            "sages": "🏆 <strong>SAGES Hakkında:</strong><br/>• 15+ yıllık deneyim<br/>• 20+ ülkede eğitim imkanları<br/>• 1000+ başarılı öğrenci<br/>• %95+ vize başarı oranı<br/>• Güvenilir ve profesyonel hizmet<br/>• 24/7 destek",
            "hizmetler": "🛠️ <strong>SAGES Hizmetleri:</strong><br/>• Üniversite seçimi ve danışmanlık<br/>• Başvuru süreçleri yönetimi<br/>• Vize işlemleri ve belge hazırlama<br/>• Konaklama organizasyonu<br/>• Kariyer planlaması<br/>• 24/7 destek hizmeti<br/>• Burs başvuru desteği",
            "başarı oranı": "📊 <strong>SAGES Başarı İstatistikleri:</strong><br/>• Vize başarı oranı: %95+<br/>• Başarılı öğrenci sayısı: 1000+<br/>• Çalıştığımız ülke sayısı: 20+<br/>• Ortalama başvuru süresi: 6-8 ay<br/>• Müşteri memnuniyeti: %98+",
            "ücretsiz danışmanlık": "🎁 <strong>Ücretsiz Danışmanlık:</strong><br/>• İlk görüşme tamamen ücretsiz<br/>• Kişisel analiz ve değerlendirme<br/>• En uygun ülke ve program seçimi<br/>• Başvuru stratejisi belirleme<br/>• Finansal planlama önerileri<br/>• Detaylı bilgilendirme"
        },
        
        // Ek sorular ve cevaplar
        "ek_sorular": {
            "burs": "🎓 <strong>Burs İmkanları:</strong><br/>• Akademik başarı bursları<br/>• Spor bursları<br/>• Sanat bursları<br/>• İhtiyaç bursları<br/>• Devlet bursları<br/>• Üniversite bursları<br/>• SAGES desteği: Burs başvuru süreci",
            "konaklama": "🏠 <strong>Konaklama Seçenekleri:</strong><br/>• Üniversite yurtları<br/>• Özel yurtlar<br/>• Ev kiralama<br/>• Aile yanında kalma<br/>• Paylaşımlı ev<br/>• SAGES desteği: Konaklama organizasyonu",
            "çalışma": "💼 <strong>Çalışma İzinleri:</strong><br/>• Öğrenci vizesi ile çalışma<br/>• Haftalık 20 saat sınırı<br/>• Kampüs içi çalışma<br/>• Staj imkanları<br/>• Mezuniyet sonrası çalışma<br/>• SAGES desteği: İş bulma danışmanlığı",
            "sağlık": "🏥 <strong>Sağlık Sigortası:</strong><br/>• Zorunlu sağlık sigortası<br/>• Ülkeye göre farklı seçenekler<br/>• Kampüs sağlık merkezleri<br/>• Acil durum sigortası<br/>• SAGES desteği: Sigorta organizasyonu",
            "dil": "🗣️ <strong>Dil Sınavları:</strong><br/>• IELTS (İngilizce)<br/>• TOEFL (İngilizce)<br/>• TestDaF (Almanca)<br/>• DELF/DALF (Fransızca)<br/>• CILS (İtalyanca)<br/>• SAGES desteği: Sınav hazırlık danışmanlığı",
            "sınav": "📝 <strong>Akademik Sınavlar:</strong><br/>• SAT (Lisans için)<br/>• ACT (Lisans için)<br/>• GRE (Yüksek lisans için)<br/>• GMAT (MBA için)<br/>• LSAT (Hukuk için)<br/>• MCAT (Tıp için)<br/>• SAGES desteği: Sınav hazırlık planı",
            "başvuru": "📋 <strong>Başvuru Süreci:</strong><br/>• Üniversite seçimi<br/>• Belge hazırlama<br/>• Başvuru formu doldurma<br/>• Referans mektupları<br/>• Motivasyon mektubu<br/>• SAGES desteği: Tüm süreç yönetimi",
            "belgeler": "📄 <strong>Gerekli Belgeler:</strong><br/>• Diploma ve transkript<br/>• Dil sınavı sonuçları<br/>• Pasaport<br/>• Fotoğraflar<br/>• Referans mektupları<br/>• Motivasyon mektubu<br/>• CV<br/>• SAGES desteği: Belge hazırlama",
            "süre": "⏰ <strong>Başvuru Süreleri:</strong><br/>• Lisans: 8-12 ay önceden<br/>• Yüksek lisans: 6-8 ay önceden<br/>• Doktora: 12-18 ay önceden<br/>• Dil okulu: 2-3 ay önceden<br/>• Lise: 6-8 ay önceden<br/>• SAGES desteği: Zamanlama planlaması",
            "maliyet": "💰 <strong>Toplam Maliyet:</strong><br/>• Eğitim ücreti<br/>• Yaşam maliyeti<br/>• Vize ücreti<br/>• Sağlık sigortası<br/>• Uçak bileti<br/>• Konaklama<br/>• SAGES desteği: Maliyet hesaplama"
        }
    };

    // Function to toggle chatbot visibility
    window.toggleSagesChatbot = function() {
        const container = document.getElementById('sagesChatbotContainer');
        if (container) {
            container.classList.toggle('active');
        }
    };

    // Function to send quick message
    window.sendSagesQuickMessage = function(message) {
        const userInput = document.getElementById('sagesUserInput');
        if (userInput) {
            userInput.value = message;
            sendSagesMessage();
        }
    };

    // Function to handle key press
    window.handleSagesKeyPress = function(event) {
        if (event.key === 'Enter') {
            sendSagesMessage();
        }
    };

    // Function to add message to chat
    function addSagesMessage(content, isUser = false) {
        const messagesContainer = document.getElementById('sagesChatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `sages-message ${isUser ? 'sages-user' : 'sages-bot'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'sages-message-content';
        contentDiv.innerHTML = content;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Function to show typing indicator
    function showSagesTypingIndicator() {
        const messagesContainer = document.getElementById('sagesChatbotMessages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'sages-message sages-bot';
        typingDiv.id = 'sagesTypingIndicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'sages-typing-indicator';
        contentDiv.innerHTML = `
            <div class="sages-typing-dot"></div>
            <div class="sages-typing-dot"></div>
            <div class="sages-typing-dot"></div>
        `;
        
        typingDiv.appendChild(contentDiv);
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Function to hide typing indicator
    function hideSagesTypingIndicator() {
        const typingIndicator = document.getElementById('sagesTypingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Function to find best response
    function findSagesBestResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for country queries
        for (const [country, info] of Object.entries(knowledgeBase.ülke)) {
            if (message.includes(country)) {
                return info;
            }
        }
        
        // Check for program queries
        for (const [program, info] of Object.entries(knowledgeBase.program)) {
            if (message.includes(program)) {
                return info;
            }
        }
        
        // Check for visa queries
        for (const [visa, info] of Object.entries(knowledgeBase.vize)) {
            if (message.includes(visa)) {
                return info;
            }
        }
        
        // Check for price queries
        for (const [price, info] of Object.entries(knowledgeBase.fiyat)) {
            if (message.includes(price)) {
                return info;
            }
        }
        
        // Check for contact queries
        for (const [contact, info] of Object.entries(knowledgeBase.iletişim)) {
            if (message.includes(contact)) {
                return info;
            }
        }
        
        // Check for general queries
        for (const [general, info] of Object.entries(knowledgeBase.genel)) {
            if (message.includes(general)) {
                return info;
            }
        }
        
        // Check for additional questions
        for (const [question, info] of Object.entries(knowledgeBase.ek_sorular)) {
            if (message.includes(question)) {
                return info;
            }
        }
        
        // Specific keyword matches
        if (message.includes('merhaba') || message.includes('selam') || message.includes('hello') || message.includes('hi')) {
            return "👋 Merhaba! SAGES Yurtdışı Eğitim Danışmanlığı'na hoş geldiniz! Size nasıl yardımcı olabilirim?";
        }
        
        if (message.includes('teşekkür') || message.includes('sağol') || message.includes('thanks')) {
            return "😊 Rica ederim! Başka sorularınız varsa çekinmeden sorabilirsiniz.";
        }
        
        if (message.includes('görüşme') || message.includes('randevu') || message.includes('appointment')) {
            return "📅 Randevu almak için " + (window.sagesChatbotConfig?.phoneNumber || '0312 431 3470') + " numaralı telefonu arayabilir veya " + (window.sagesChatbotConfig?.email || 'sages@sages.com.tr') + " adresine e-posta gönderebilirsiniz.";
        }
        
        if (message.includes('başvuru') || message.includes('application') || message.includes('apply')) {
            return "📋 Başvuru süreci ülkeye ve programa göre değişir. Genellikle 6-12 ay önceden başlamanızı öneririz. Detaylı bilgi için bizimle iletişime geçebilirsiniz.";
        }
        
        if (message.includes('sınav') || message.includes('test') || message.includes('exam')) {
            return "📝 Dil sınavları (IELTS, TOEFL, SAT, ACT) ve diğer gerekli sınavlar hakkında detaylı bilgi için bizimle iletişime geçebilirsiniz.";
        }
        
        if (message.includes('konaklama') || message.includes('yurt') || message.includes('ev') || message.includes('accommodation')) {
            return "🏠 Konaklama seçenekleri ülkeye göre değişir. Yurt, özel yurt, ev kiralama gibi seçenekler mevcuttur. Detaylı bilgi için bizimle iletişime geçebilirsiniz.";
        }
        
        if (message.includes('burs') || message.includes('scholarship') || message.includes('grant')) {
            return "🎓 Burs imkanları ülkeye ve üniversiteye göre değişir. Akademik başarı, dil seviyesi ve diğer kriterlere göre burs alabilirsiniz. Detaylı bilgi için bizimle iletişime geçebilirsiniz.";
        }
        
        if (message.includes('çalışma') || message.includes('work') || message.includes('iş') || message.includes('job')) {
            return "💼 Öğrenci vizesi ile çalışma izinleri ülkeye göre değişir. Genellikle haftalık 20 saat çalışma izni verilir. Detaylı bilgi için bizimle iletişime geçebilirsiniz.";
        }
        
        if (message.includes('sağlık') || message.includes('health') || message.includes('sigorta') || message.includes('insurance')) {
            return "🏥 Sağlık sigortası yurtdışı eğitim için zorunludur. Ülkeye göre farklı sigorta seçenekleri mevcuttur. Detaylı bilgi için bizimle iletişime geçebilirsiniz.";
        }
        
        if (message.includes('dönüş') || message.includes('return') || message.includes('geri') || message.includes('back')) {
            return "🔄 Eğitim sonrası dönüş süreci ve kariyer planlaması konusunda da size yardımcı olabiliriz. Detaylı bilgi için bizimle iletişime geçebilirsiniz.";
        }
        
        if (message.includes('maliyet') || message.includes('cost') || message.includes('ücret') || message.includes('price')) {
            return "💰 Eğitim ve yaşam maliyetleri ülkeye göre değişir. Detaylı maliyet analizi için bizimle iletişime geçebilirsiniz.";
        }
        
        if (message.includes('süre') || message.includes('time') || message.includes('ne kadar') || message.includes('how long')) {
            return "⏰ Eğitim süreleri program türüne göre değişir. Lisans 3-4 yıl, yüksek lisans 1-2 yıl, doktora 3-5 yıl sürer.";
        }
        
        if (message.includes('belge') || message.includes('document') || message.includes('evrak')) {
            return "📄 Gerekli belgeler program ve ülkeye göre değişir. Genellikle diploma, dil sınavı, pasaport ve referans mektupları gereklidir.";
        }
        
        if (message.includes('dil') || message.includes('language') || message.includes('english') || message.includes('ingilizce')) {
            return "🗣️ Dil gereksinimleri ülkeye göre değişir. İngilizce için IELTS/TOEFL, Almanca için TestDaF, Fransızca için DELF/DALF gerekebilir.";
        }
        
        if (message.includes('üniversite') || message.includes('university') || message.includes('okul') || message.includes('school')) {
            return "🎓 Üniversite seçimi çok önemlidir. Akademik başarı, bütçe, konum ve program kalitesi gibi faktörleri değerlendirmek gerekir.";
        }
        
        if (message.includes('vize') || message.includes('visa') || message.includes('izin')) {
            return "🛂 Vize işlemleri ülkeye göre değişir. Genellikle kabul mektubu, finansal belgeler ve sağlık sigortası gereklidir.";
        }
        
        if (message.includes('hangi') || message.includes('which') || message.includes('ne') || message.includes('what')) {
            return "🤔 Hangi konuda bilgi almak istiyorsunuz? Ülke seçimi, program türü, vize işlemleri veya başka bir konu mu?";
        }
        
        if (message.includes('nasıl') || message.includes('how') || message.includes('neden') || message.includes('why')) {
            return "💡 Bu konuda detaylı bilgi vermek için hangi spesifik konuyu merak ediyorsunuz?";
        }
        
        if (message.includes('ne zaman') || message.includes('when') || message.includes('zaman')) {
            return "📅 Başvuru süreleri program türüne göre değişir. Genellikle 6-12 ay önceden başlamanızı öneririz.";
        }
        
        if (message.includes('nerede') || message.includes('where') || message.includes('hangi ülke')) {
            return "🌍 20+ ülkede eğitim imkanları sunuyoruz. ABD, İngiltere, Almanya, Kanada, Fransa, İtalya, Polonya, Macaristan, Letonya, Estonya gibi ülkelerde eğitim alabilirsiniz.";
        }
        
        // If no specific match found, return null
        return null;
    }

    // Function to send message
    window.sendSagesMessage = function() {
        const userInput = document.getElementById('sagesUserInput');
        if (!userInput) return;
        
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        // Add user message
        addSagesMessage(message, true);
        userInput.value = '';
        
        // Show typing indicator
        showSagesTypingIndicator();
        isTyping = true;
        
        // Simulate response delay
        setTimeout(() => {
            hideSagesTypingIndicator();
            isTyping = false;
            
            const response = findSagesBestResponse(message);
            
            if (response) {
                addSagesMessage(response);
            } else {
                // WhatsApp redirect message
                const whatsappNumber = window.sagesChatbotConfig?.whatsappNumber || '905063309699';
                const phoneNumber = window.sagesChatbotConfig?.phoneNumber || '0312 431 3470';
                const email = window.sagesChatbotConfig?.email || 'sages@sages.com.tr';
                const address = window.sagesChatbotConfig?.address || 'Cumhuriyet Mah. Atatürk Bulvarı No: 83/16 Çankaya/Ankara';
                
                const whatsappMessage = `
                    <div class="sages-whatsapp-redirect">
                        <p>Bu soruyu daha detaylı cevaplamamız için lütfen bizimle WhatsApp üzerinden iletişime geçin:</p>
                        <a href="https://wa.me/${whatsappNumber}" target="_blank">WhatsApp'ta Konuş</a>
                    </div>
                    <p><strong>İletişim Bilgileri:</strong></p>
                    <p>📞 Telefon: ${phoneNumber}</p>
                    <p>📧 E-posta: ${email}</p>
                    <p>📍 Adres: ${address}</p>
                `;
                addSagesMessage(whatsappMessage);
            }
        }, 1500);
    };

    // Initialize chatbot when DOM is ready
    $(document).ready(function() {
        // Auto-open chatbot after 3 seconds
        setTimeout(() => {
            if (!localStorage.getItem('sagesChatbotOpened')) {
                toggleSagesChatbot();
                localStorage.setItem('sagesChatbotOpened', 'true');
            }
        }, 3000);
    });

})(jQuery);
