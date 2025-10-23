<?php
/**
 * Plugin Name: SAGES Chatbot
 * Description: SAGES Yurtdışı Eğitim Danışmanlığı için özel chatbot - Enhanced Version
 * Version: 2.0
 * Author: SAGES
 * Text Domain: sages-chatbot
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class SAGESChatbot {
    
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'add_chatbot_html'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        
        // Add activation hook
        register_activation_hook(__FILE__, array($this, 'activate'));
    }
    
    public function activate() {
        // Set default options on activation
        add_option('sages_chatbot_whatsapp', '905063309699');
        add_option('sages_chatbot_phone', '0312 431 3470');
        add_option('sages_chatbot_email', 'sages@sages.com.tr');
        add_option('sages_chatbot_address', 'Cumhuriyet Mah. Atatürk Bulvarı No: 83/16 Çankaya/Ankara');
        add_option('sages_chatbot_enabled', 1);
    }
    
    public function enqueue_scripts() {
        // Only load if chatbot is enabled
        if (!get_option('sages_chatbot_enabled', 1)) {
            return;
        }
        
        wp_enqueue_style('sages-chatbot-style', plugin_dir_url(__FILE__) . 'sages-chatbot.css', array(), '2.0');
        wp_enqueue_script('jquery');
        wp_enqueue_script('sages-chatbot-script', plugin_dir_url(__FILE__) . 'sages-chatbot.js', array('jquery'), '2.0', true);
    }
    
    public function add_chatbot_html() {
        // Only show on frontend and if enabled
        if (is_admin() || !get_option('sages_chatbot_enabled', 1)) {
            return;
        }
        
        $whatsapp_number = get_option('sages_chatbot_whatsapp', '905063309699');
        $phone_number = get_option('sages_chatbot_phone', '0312 431 3470');
        $email = get_option('sages_chatbot_email', 'sages@sages.com.tr');
        $address = get_option('sages_chatbot_address', 'Cumhuriyet Mah. Atatürk Bulvarı No: 83/16 Çankaya/Ankara');
        
        ?>
        <!-- SAGES Chatbot Toggle Button -->
        <button class="sages-chatbot-toggle" onclick="toggleSagesChatbot()">
            💬
        </button>

        <!-- SAGES Chatbot Container -->
        <div class="sages-chatbot-container" id="sagesChatbotContainer">
            <div class="sages-chatbot-header">
                <h3>SAGES Yurtdışı Eğitim</h3>
                <button class="sages-chatbot-close" onclick="toggleSagesChatbot()">×</button>
            </div>
            
            <div class="sages-chatbot-messages" id="sagesChatbotMessages">
                <div class="sages-message sages-bot">
                    <div class="sages-message-content">
                        👋 Merhaba! SAGES Yurtdışı Eğitim Danışmanlığı'na hoş geldiniz! Size nasıl yardımcı olabilirim?
                    </div>
                </div>
            </div>
            
            <div class="sages-chatbot-quick-actions">
                <button onclick="sendSagesQuickMessage('Hangi ülkelerde eğitim alabilirim?')">🌍 Ülke Seçenekleri</button>
                <button onclick="sendSagesQuickMessage('Fiyatlar nasıl?')">💰 Fiyatlar</button>
                <button onclick="sendSagesQuickMessage('Vize işlemleri nasıl?')">🛂 Vize</button>
                <button onclick="sendSagesQuickMessage('Burs imkanları neler?')">🎓 Burs İmkanları</button>
                <button onclick="sendSagesQuickMessage('Konaklama seçenekleri neler?')">🏠 Konaklama</button>
                <button onclick="sendSagesQuickMessage('Dil sınavları hakkında bilgi')">🗣️ Dil Sınavları</button>
            </div>
            
            <div class="sages-chatbot-input">
                <input type="text" id="sagesUserInput" placeholder="Mesajınızı yazın..." onkeypress="handleSagesKeyPress(event)">
                <button onclick="sendSagesMessage()">➤</button>
            </div>
        </div>
        
        <script>
            // SAGES Chatbot Configuration
            window.sagesChatbotConfig = {
                whatsappNumber: '<?php echo esc_js($whatsapp_number); ?>',
                phoneNumber: '<?php echo esc_js($phone_number); ?>',
                email: '<?php echo esc_js($email); ?>',
                address: '<?php echo esc_js($address); ?>'
            };
        </script>
        <?php
    }
    
    public function add_admin_menu() {
        add_options_page(
            'SAGES Chatbot Ayarları',
            'SAGES Chatbot',
            'manage_options',
            'sages-chatbot-settings',
            array($this, 'admin_page')
        );
    }
    
    public function register_settings() {
        register_setting('sages_chatbot_settings', 'sages_chatbot_whatsapp');
        register_setting('sages_chatbot_settings', 'sages_chatbot_phone');
        register_setting('sages_chatbot_settings', 'sages_chatbot_email');
        register_setting('sages_chatbot_settings', 'sages_chatbot_address');
        register_setting('sages_chatbot_settings', 'sages_chatbot_enabled');
    }
    
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>🤖 SAGES Chatbot Ayarları</h1>
            <div class="notice notice-info">
                <p><strong>SAGES Chatbot v2.0</strong> - Gelişmiş özellikler ve modern tasarım ile yurtdışı eğitim danışmanlığı için özel olarak geliştirilmiştir.</p>
            </div>
            
            <form method="post" action="options.php">
                <?php
                settings_fields('sages_chatbot_settings');
                do_settings_sections('sages_chatbot_settings');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">Chatbot'u Etkinleştir</th>
                        <td>
                            <label>
                                <input type="checkbox" name="sages_chatbot_enabled" value="1" <?php checked(get_option('sages_chatbot_enabled', 1), 1); ?> />
                                Chatbot'u web sitesinde göster
                            </label>
                            <p class="description">✅ Etkinleştirildiğinde chatbot tüm sayfalarda görünür</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">📱 WhatsApp Numarası</th>
                        <td>
                            <input type="text" name="sages_chatbot_whatsapp" value="<?php echo esc_attr(get_option('sages_chatbot_whatsapp', '905063309699')); ?>" class="regular-text" />
                            <p class="description">WhatsApp numarasını ülke kodu ile birlikte girin (örn: 905063309699)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">📞 Telefon Numarası</th>
                        <td>
                            <input type="text" name="sages_chatbot_phone" value="<?php echo esc_attr(get_option('sages_chatbot_phone', '0312 431 3470')); ?>" class="regular-text" />
                            <p class="description">Müşterilerin arayabileceği telefon numarası</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">📧 E-posta Adresi</th>
                        <td>
                            <input type="email" name="sages_chatbot_email" value="<?php echo esc_attr(get_option('sages_chatbot_email', 'sages@sages.com.tr')); ?>" class="regular-text" />
                            <p class="description">İletişim için kullanılacak e-posta adresi</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">📍 Adres</th>
                        <td>
                            <textarea name="sages_chatbot_address" rows="3" cols="50" class="large-text"><?php echo esc_textarea(get_option('sages_chatbot_address', 'Cumhuriyet Mah. Atatürk Bulvarı No: 83/16 Çankaya/Ankara')); ?></textarea>
                            <p class="description">Ofis adresiniz</p>
                        </td>
                    </tr>
                </table>
                
                <div class="card" style="max-width: 600px; margin-top: 20px;">
                    <h3>🎯 Chatbot Özellikleri</h3>
                    <ul>
                        <li>✅ <strong>10 Ülke Desteği:</strong> ABD, İngiltere, Almanya, Kanada, Fransa, İtalya, Polonya, Macaristan, Letonya, Estonya</li>
                        <li>✅ <strong>Eğitim Programları:</strong> Lisans, Yüksek Lisans, Doktora, Dil Okulu, Lise</li>
                        <li>✅ <strong>Vize Bilgileri:</strong> Güncel vize süreçleri ve ücretleri</li>
                        <li>✅ <strong>Maliyet Analizi:</strong> Eğitim ve yaşam maliyetleri</li>
                        <li>✅ <strong>WhatsApp Entegrasyonu:</strong> Bilinmeyen sorular için otomatik yönlendirme</li>
                        <li>✅ <strong>Modern Tasarım:</strong> Kırmızı tema ile profesyonel görünüm</li>
                        <li>✅ <strong>Mobil Uyumlu:</strong> Tüm cihazlarda mükemmel çalışır</li>
                    </ul>
                </div>
                
                <?php submit_button('Ayarları Kaydet', 'primary', 'submit', false); ?>
            </form>
            
            <div class="card" style="max-width: 600px; margin-top: 20px;">
                <h3>📋 Kurulum Talimatları</h3>
                <ol>
                    <li><strong>Plugin Dosyalarını Yükleyin:</strong> Tüm dosyaları <code>/wp-content/plugins/sages-chatbot/</code> klasörüne yükleyin</li>
                    <li><strong>Plugin'i Etkinleştirin:</strong> WordPress admin panelinde "Eklentiler" > "SAGES Chatbot" > "Etkinleştir"</li>
                    <li><strong>Ayarları Yapın:</strong> "Ayarlar" > "SAGES Chatbot" menüsünden iletişim bilgilerinizi güncelleyin</li>
                    <li><strong>Test Edin:</strong> Web sitenizi ziyaret ederek chatbot'un çalıştığını kontrol edin</li>
                </ol>
            </div>
        </div>
        
        <style>
        .card {
            background: #fff;
            border: 1px solid #ccd0d4;
            border-radius: 4px;
            padding: 20px;
            margin: 20px 0;
        }
        .card h3 {
            margin-top: 0;
            color: #c62828;
        }
        .card ul, .card ol {
            margin-left: 20px;
        }
        .card li {
            margin-bottom: 8px;
        }
        </style>
        <?php
    }
}

// Initialize the plugin
new SAGESChatbot();
?>