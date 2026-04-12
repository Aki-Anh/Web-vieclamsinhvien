// pagination.js - Module phân trang
const Pagination = {
  // Cấu hình mặc định
  config: {
    itemsPerPage: 6,
    maxVisiblePages: 5,
    containerId: "paginationContainer",
  },

  // Biến trạng thái
  state: {
    currentPage: 1,
    totalItems: 0,
    onPageChange: null,
  },

  // Khởi tạo phân trang
  init: function (config = {}, onPageChangeCallback = null) {
    // Ghi đè cấu hình nếu có
    if (config.itemsPerPage) this.config.itemsPerPage = config.itemsPerPage;
    if (config.maxVisiblePages)
      this.config.maxVisiblePages = config.maxVisiblePages;
    if (config.containerId) this.config.containerId = config.containerId;

    // Lưu callback
    this.state.onPageChange = onPageChangeCallback;

    return this;
  },

  // Cập nhật trạng thái phân trang
  update: function (totalItems, currentPage = 1) {
    this.state.totalItems = totalItems;
    this.state.currentPage = currentPage;
    return this;
  },

  // Render giao diện phân trang
  render: function () {
    const container = document.getElementById(this.config.containerId);
    if (!container) return;

    const totalPages = Math.ceil(
      this.state.totalItems / this.config.itemsPerPage,
    );

    if (totalPages <= 1) {
      container.innerHTML = "";
      return;
    }

    let paginationHTML = "";

    // Nút Trước
    if (this.state.currentPage > 1) {
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${this.state.currentPage - 1}">Trước</a></li>`;
    } else {
      paginationHTML += `<li class="page-item disabled"><a class="page-link" href="#">Trước</a></li>`;
    }

    // Các nút trang
    const { startPage, endPage } = this.calculatePageRange(totalPages);

    for (let i = startPage; i <= endPage; i++) {
      if (i === this.state.currentPage) {
        paginationHTML += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
      } else {
        paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
      }
    }

    // Nút Tiếp
    if (this.state.currentPage < totalPages) {
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${this.state.currentPage + 1}">Tiếp</a></li>`;
    } else {
      paginationHTML += `<li class="page-item disabled"><a class="page-link" href="#">Tiếp</a></li>`;
    }

    container.innerHTML = paginationHTML;

    // Gắn sự kiện click
    this.attachEvents();
  },

  // Tính toán phạm vi các trang hiển thị
  calculatePageRange: function (totalPages) {
    const maxVisiblePages = this.config.maxVisiblePages;
    let startPage = Math.max(
      1,
      this.state.currentPage - Math.floor(maxVisiblePages / 2),
    );
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return { startPage, endPage };
  },

  // Gắn sự kiện click cho các nút phân trang
  attachEvents: function () {
    const container = document.getElementById(this.config.containerId);
    if (!container) return;

    container.querySelectorAll(".page-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute("data-page"));
        if (page && page !== this.state.currentPage) {
          this.goToPage(page);
        }
      });
    });
  },

  // Chuyển đến trang cụ thể
  goToPage: function (page) {
    this.state.currentPage = page;
    this.render();

    // Gọi callback nếu có
    if (typeof this.state.onPageChange === "function") {
      this.state.onPageChange(page);
    }
  },

  // Lấy chỉ số bắt đầu và kết thúc của items trên trang hiện tại
  getCurrentPageItemsRange: function () {
    const startIndex = (this.state.currentPage - 1) * this.config.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.config.itemsPerPage,
      this.state.totalItems,
    );
    return { startIndex, endIndex };
  },

  // Lấy số items mỗi trang
  getItemsPerPage: function () {
    return this.config.itemsPerPage;
  },

  // Lấy trang hiện tại
  getCurrentPage: function () {
    return this.state.currentPage;
  },

  // Đặt lại về trang 1
  resetToFirstPage: function () {
    this.state.currentPage = 1;
  },
};
