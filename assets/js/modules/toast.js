// Toast Notification Module
const Toast = {
  // Tạo và hiển thị toast
  create: function (message, type = "info", duration = 3000) {
    // Tạo container nếu chưa tồn tại
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    // Tạo toast element
    const toast = document.createElement("div");
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
            <i class="bi ${this.getIcon(type)}"></i>
            <span>${message}</span>
        `;

    container.appendChild(toast);

    // Hiển thị với animation
    setTimeout(() => toast.classList.add("show"), 10);

    // Tự động ẩn
    const autoHideTimer = setTimeout(() => {
      this.hideToast(toast);
    }, duration);

    // Thêm sự kiện đóng khi click vào toast
    toast.addEventListener("click", (e) => {
      // Chỉ đóng khi click trực tiếp vào toast (không phải con của toast)
      if (e.target === toast || e.target.closest('.toast-notification i')) {
        // Hủy timer tự động ẩn
        clearTimeout(autoHideTimer);
        this.hideToast(toast);
      }
    });

    return toast;
  },

  // Ẩn toast với animation
  hideToast: function (toast) {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  },

  // Shortcut methods
  success: function (message, duration) {
    return this.create(message, "success", duration);
  },

  error: function (message, duration) {
    return this.create(message, "error", duration);
  },

  info: function (message, duration) {
    return this.create(message, "info", duration);
  },

  warning: function (message, duration) {
    return this.create(message, "warning", duration);
  },

  // Icon mapping
  getIcon: function (type) {
    const icons = {
      success: "bi-check-circle",
      error: "bi-exclamation-triangle",
      info: "bi-info-circle",
      warning: "bi-exclamation-circle",
    };
    return icons[type] || icons.info;
  },
};
