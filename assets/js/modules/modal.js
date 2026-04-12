// Modal Module - Đơn giản cho đồ án nhập môn
const Modal = {
    // Hiển thị modal
    show: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },

    // Ẩn modal
    hide: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    },

    // Đóng tất cả modals
    closeAll: function() {
        const modals = document.querySelectorAll('[id$="Modal"]');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
    }
};

