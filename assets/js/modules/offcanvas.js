// Offcanvas Module - Quản lý offcanvas menu và login panel
const Offcanvas = {
    // State management
    state: {
        isMenuOpen: false
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
                this.closeMenu();
            });
        }

        // Click outside to close menu only
        document.addEventListener('click', (e) => {
            this.handleClickOutside(e);
        });

        // ESC key to close menu only
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
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


// Thêm vào cuối file offcanvas.js
document.addEventListener('DOMContentLoaded', function() {
  // Theo dõi thay đổi trạng thái đăng nhập để cập nhật offcanvas
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        // Kiểm tra nếu có thay đổi trong auth container
        if (typeof updateOffcanvasAuthUI === 'function') {
          setTimeout(updateOffcanvasAuthUI, 100);
        }
      }
    });
  });

  // Quan sát thay đổi trong auth container
  const authContainer = document.getElementById('authContainer');
  if (authContainer) {
    observer.observe(authContainer, { childList: true, subtree: true });
  }
});
