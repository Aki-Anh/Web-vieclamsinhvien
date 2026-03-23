// loginPanel.js - Module quản lý login panel tái sử dụng 
const LoginPanel = {
    // Kiểm tra trạng thái đăng nhập 
    isLoggedIn: function() { 
        return localStorage.getItem('isLoggedIn') === 'true'; 
    },

    // Mở login panel 
    open: function(callback) {
        console.log('LoginPanel.open() called'); // Debug
        if (callback && typeof callback === 'function') { 
            window.pendingAuthCallback = callback; 
        }

        const panel = document.getElementById('loginPanel');
        const overlay = document.querySelector('.login-overlay');
        
        console.log('Panel:', panel, 'Overlay:', overlay); // Debug
        
        if (panel && overlay) {
            panel.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Login panel and overlay activated'); // Debug
        } else {
            console.error('Cannot find login panel or overlay elements');
        }
    },

    close: function() {
        console.log('LoginPanel.close() called'); // Debug
        const panel = document.getElementById('loginPanel');
        const overlay = document.querySelector('.login-overlay');
        
        // Luôn reset callback khi đóng panel
        window.pendingAuthCallback = null;
        
        if (panel) {
            panel.classList.remove('active');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Luôn reset overflow của body
        document.body.style.overflow = '';
        console.log('Login panel and overlay deactivated'); // Debug
    },

    // Yêu cầu đăng nhập với callback
    requireLogin: function(callback) {
        console.log('LoginPanel.requireLogin() called'); // Debug
        if (this.isLoggedIn()) {
            console.log('User already logged in'); // Debug
            if (callback && typeof callback === 'function') {
                callback();
            }
        } else {
            console.log('User not logged in, opening login panel'); // Debug
            this.open(callback);
        }
    },

    // Xử lý đăng nhập
    login: function(email, password) {
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify({
                email: email,
                name: email.split('@')[0]
            }));
            return true;
        }
        return false;
    },

    // Đăng xuất
    logout: function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
    },

    // Khởi tạo login panel
    init: function() {
        console.log('LoginPanel.init() called'); // Debug
        
        // Gắn sự kiện cho form đăng nhập
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = loginForm.querySelector('#email').value;
                const password = loginForm.querySelector('#loginPassword').value;
                
                if (this.login(email, password)) {
                    this.close();
                    
                    // Hiển thị thông báo
                    if (typeof Toast !== 'undefined') {
                        Toast.success('Đăng nhập thành công!');
                    }
                    
                    // Thực hiện callback nếu có
                    if (window.pendingAuthCallback && typeof window.pendingAuthCallback === 'function') {
                        const callback = window.pendingAuthCallback;
                        window.pendingAuthCallback = null;
                        callback();
                    }
                } else {
                    if (typeof Toast !== 'undefined') {
                        Toast.error('Email hoặc mật khẩu không đúng!');
                    }
                }
            });
        }

        // Gắn sự kiện cho nút đóng
        const closeBtn = document.querySelector('.login-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        // Gắn sự kiện click outside
        const overlay = document.querySelector('.login-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                // Chỉ đóng khi click trực tiếp vào overlay, không phải con của nó
                if (e.target === overlay) {
                    this.close();
                }
            });
        }

        // Gắn sự kiện ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });

        // Gắn sự kiện toggle password
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', function() {
                const passwordField = this.closest('.password-field').querySelector('input');
                const icon = this.querySelector('i');
                
                if (passwordField && icon) {
                    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                    icon.classList.toggle('bi-eye');
                    icon.classList.toggle('bi-eye-slash');
                }
            });
        });
    }
};
