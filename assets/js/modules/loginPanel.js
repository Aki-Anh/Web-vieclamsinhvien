// loginPanel.js - Module quản lý login panel tái sử dụng 
const LoginPanel = {
    // Kiểm tra trạng thái đăng nhập 
    isLoggedIn: function() { 
        return localStorage.getItem('isLoggedIn') === 'true'; 
    },

    // Mở login panel 
    open: function(callback) {
        if (callback && typeof callback === 'function') { 
            window.pendingAuthCallback = callback; 
        }

        const panel = document.getElementById('loginPanel');
        const overlay = document.querySelector('.login-overlay');
        
        if (panel && overlay) {
            panel.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    close: function() {
        const panel = document.getElementById('loginPanel');
        const overlay = document.querySelector('.login-overlay');
        
        window.pendingAuthCallback = null;
        
        if (panel) {
            panel.classList.remove('active');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        document.body.style.overflow = '';
    },

    // Yêu cầu đăng nhập với callback
    requireLogin: function(callback) {
        if (this.isLoggedIn()) {
            if (callback && typeof callback === 'function') {
                callback();
            }
        } else {
            this.open(callback);
        }
    },

    // Xử lý đăng nhập
    login: function(email, password, isEmployer = false) {
        if (!email || !password) {
            return false;
        }
        
        if (!email.includes('@')) {
            return false;
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userInfo', JSON.stringify({
            email: email,
            name: email.split('@')[0]
        }));
        
        // Lưu thông tin nhà tuyển dụng
        if (isEmployer) {
            localStorage.setItem('isEmployer', 'true');
        } else {
            localStorage.removeItem('isEmployer');
        }
        
        return true;
    },

    // Đăng xuất
    logout: function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isEmployer');
    },

    // Khởi tạo login panel
    init: function() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const emailInput = loginForm.querySelector('#email');
                const passwordInput = loginForm.querySelector('#loginPassword');
                const employerCheckbox = loginForm.querySelector('#employerLogin');

                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();
                const isEmployer = employerCheckbox ? employerCheckbox.checked : false;

                if (!email || !password) {
                    Toast.error("Vui lòng nhập đầy đủ Email và Mật khẩu!");
                    return;
                }

                if (this.login(email, password, isEmployer)) {
                    this.close();
                    if (typeof Toast !== "undefined") {
                        Toast.success(isEmployer ? 'Đăng nhập nhà tuyển dụng thành công!' : 'Đăng nhập thành công!');
                    } else {
                        alert(isEmployer ? 'Đăng nhập nhà tuyển dụng thành công!' : 'Đăng nhập thành công!');
                    }
                    
                    if (window.pendingAuthCallback && typeof window.pendingAuthCallback === 'function') {
                        const callback = window.pendingAuthCallback;
                        window.pendingAuthCallback = null;
                        callback();
                    }
                    
                    window.location.reload();
                } else {
                    if (typeof Toast !== "undefined") {
                        Toast.error('Email hoặc mật khẩu không đúng!');
                    } else {
                        alert('Email hoặc mật khẩu không đúng!');
                    }
                }
            });
        }

        const closeBtn = document.querySelector('.login-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close();
            });
        }

        const overlay = document.querySelector('.login-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });

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
