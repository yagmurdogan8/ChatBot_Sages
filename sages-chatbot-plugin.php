<?php
/**
 * Plugin Name: SAGES Chatbot
 * Description: SAGES Yurtdışı Eğitim Danışmanlığı için özel chatbot
 * Version: 1.0
 * Author: SAGES
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
    }
    
    public function enqueue_scripts() {
        wp_enqueue_style('sages-chatbot-style', plugin_dir_url(__FILE__) . 'sages-chatbot.css', array(), '1.0');
        wp_enqueue_script('sages-chatbot-script', plugin_dir_url(__FILE__) . 'sages-chatbot.js', array('jquery'), '1.0', true);
    }
    
    public function add_chatbot_html() {
        // Only show on frontend
        if (is_admin()) {
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
            <h1>SAGES Chatbot Ayarları</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('sages_chatbot_settings');
                do_settings_sections('sages_chatbot_settings');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">WhatsApp Numarası</th>
                        <td>
                            <input type="text" name="sages_chatbot_whatsapp" value="<?php echo esc_attr(get_option('sages_chatbot_whatsapp', '905063309699')); ?>" />
                            <p class="description">WhatsApp numarasını ülke kodu ile birlikte girin (örn: 905063309699)</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Telefon Numarası</th>
                        <td>
                            <input type="text" name="sages_chatbot_phone" value="<?php echo esc_attr(get_option('sages_chatbot_phone', '0312 431 3470')); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">E-posta Adresi</th>
                        <td>
                            <input type="email" name="sages_chatbot_email" value="<?php echo esc_attr(get_option('sages_chatbot_email', 'sages@sages.com.tr')); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Adres</th>
                        <td>
                            <textarea name="sages_chatbot_address" rows="3" cols="50"><?php echo esc_textarea(get_option('sages_chatbot_address', 'Cumhuriyet Mah. Atatürk Bulvarı No: 83/16 Çankaya/Ankara')); ?></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Chatbot'u Etkinleştir</th>
                        <td>
                            <input type="checkbox" name="sages_chatbot_enabled" value="1" <?php checked(get_option('sages_chatbot_enabled', 1), 1); ?> />
                            <p class="description">Chatbot'u web sitesinde göster/gizle</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

// Initialize the plugin
new SAGESChatbot();
?>
