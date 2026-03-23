// Offcanvas Module - Quản lý offcanvas menu và login panel
const Offcanvas = {
    // State management
    state: {
        isMenuOpen: false,
        isLoginPanelOpen: false // Có thể bỏ dòng này
    },

    // Initialize offcanvas system
    init: function() {
        this.bindEvents();
        this.handleWindowResize();
    },

    // Bind all events
    bindEvents: function() {
        // Menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const offcanvasClose = document.querySelector('.offcanvas-close');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMenu();
            });
        }
        
        if (offcanvasClose) {
            offcanvasClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMenu(); // Chỉ đóng menu, không đóng login panel
            });
        }

        // Loại bỏ phần login trigger ở đây - để LoginPanel module xử lý

        // Click outside to close menu only
        document.addEventListener('click', (e) => {
            this.handleClickOutside(e);
        });

        // ESC key to close menu only
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu(); // Chỉ đóng menu
            }
        });
    },

    // Toggle offcanvas menu
    toggleMenu: function() {
        const menu = document.getElementById('offcanvasMenu');
        const overlay = document.querySelector('.offcanvas-overlay');
        
        if (menu && overlay) {
            menu.classList.toggle('active');
            this.state.isMenuOpen = menu.classList.contains('active');
            
            if (this.state.isMenuOpen) {
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        }
    },

    // Close menu specifically
    closeMenu: function() {
        const menu = document.getElementById('offcanvasMenu');
        const overlay = document.querySelector('.offcanvas-overlay');
        
        if (menu) {
            menu.classList.remove('active');
            this.state.isMenuOpen = false;
        }
        
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        document.body.style.overflow = '';
    },

    // Handle click outside panels
    handleClickOutside: function(e) {
        const menu = document.getElementById('offcanvasMenu');
        const menuToggle = document.querySelector('.menu-toggle');

        // Close menu when clicking outside
        if (menu && menu.classList.contains('active') &&
            !e.target.closest('#offcanvasMenu') && 
            !e.target.closest('.menu-toggle') &&
            !e.target.closest('.offcanvas-close')) {
            this.closeMenu();
        }

        // KHÔNG xử lý login panel ở đây - để LoginPanel module xử lý
    },

    // Handle window resize
    handleWindowResize: function() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                // On desktop, close mobile panels
                this.closeMenu();
            }
        });
    }

};

// Thêm vào cuối file offcanvas.js, bên ngoài object Offcanvas

// Bind login trigger events globally
document.addEventListener('DOMContentLoaded', function() {
    // Navbar login trigger
    const loginTrigger = document.querySelector('.login-trigger');
    if (loginTrigger) {
        loginTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof LoginPanel !== 'undefined') {
                LoginPanel.open();
            }
        });
    }

    // Offcanvas mobile login trigger
    const loginTriggerMobile = document.querySelector('.login-trigger-mobile');
    if (loginTriggerMobile) {
        loginTriggerMobile.addEventListener('click', (e) => {
            e.preventDefault();
            // Đóng offcanvas menu trước khi mở login panel
            if (typeof Offcanvas !== 'undefined') {
                Offcanvas.closeMenu();
            }
            if (typeof LoginPanel !== 'undefined') {
                LoginPanel.open();
            }
        });
    }
});
