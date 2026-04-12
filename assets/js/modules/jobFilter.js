// jobFilter.js - Module quản lý filter cho trang jobs
const JobFilter = {
  // Biến lưu filter đang chọn và trạng thái
  currentFilters: {
    categories: [],
    locations: [],
    keyword: "",
  },

  state: {
    isOpen: false,
  },

  // Lấy danh sách unique categories từ job data
  getUniqueCategories() {
    const jobs = JobData.getAllJobs();
    const categories = [...new Set(jobs.map((job) => job.category))];
    return categories.sort();
  },

  // Lấy danh sách unique locations từ job data
  getUniqueLocations() {
    const jobs = JobData.getAllJobs();
    const locations = [
      ...new Set(
        jobs.map((job) => {
          // Extract district từ location (ví dụ: "Ninh Kiều, Cần Thơ" -> "Ninh Kiều")
          return job.location.split(",")[0].trim();
        }),
      ),
    ];
    return locations.sort();
  },

  // Đếm số jobs trong mỗi category
  getCountByCategory(category) {
    return JobData.getAllJobs().filter(
      (job) => job.category.toLowerCase() === category.toLowerCase(),
    ).length;
  },

  // Đếm số jobs trong mỗi location
  getCountByLocation(location) {
    return JobData.getAllJobs().filter((job) =>
      job.location.toLowerCase().includes(location.toLowerCase()),
    ).length;
  },

  // Generate HTML cho category checkboxes
  generateCategoryCheckboxes() {
    const categories = this.getUniqueCategories();
    let html = `
      <div class="filter-group-header">
        <h5 class="filter-group-title">Ngành nghề</h5>
        <i class="bi bi-chevron-down"></i>
      </div>
      <div class="filter-items">
    `;

    if (categories.length === 0) {
      html += '<p class="text-muted">Không có danh mục nào</p>';
      html += "</div>"; // Đóng filter-items
      return html;
    }

    categories.forEach((category, index) => {
      const categoryId = `cat${index + 1}`;
      const categoryName = category;
      const count = this.getCountByCategory(category);

      html += `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="${categoryId}" value="${categoryName.toLowerCase()}">
          <label class="form-check-label" for="${categoryId}">${categoryName} (${count})</label>
        </div>
      `;
    });

    html += "</div>"; // Đóng filter-items
    return html;
  },

  // Generate HTML cho location checkboxes
  generateLocationCheckboxes() {
    const locations = this.getUniqueLocations();
    let html = `
      <div class="filter-group-header">
        <h5 class="filter-group-title">Khu vực</h5>
        <i class="bi bi-chevron-down"></i>
      </div>
      <div class="filter-items">
    `;

    if (locations.length === 0) {
      html += '<p class="text-muted">Không có khu vực nào</p>';
      html += "</div>"; // Đóng filter-items
      return html;
    }

    locations.forEach((location, index) => {
      const locationId = `loc${index + 1}`;
      const locationName = location;
      const count = this.getCountByLocation(location);

      html += `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="${locationId}" value="${locationName.toLowerCase().replace(/\s+/g, "")}">
          <label class="form-check-label" for="${locationId}">${locationName} (${count})</label>
        </div>
      `;
    });

    html += "</div>"; // Đóng filter-items
    return html;
  },

  // Kiểm tra có phải mobile không
  isMobile() {
    return window.innerWidth <= 992;
  },

  // Mở filter (bottom sheet trên mobile, sidebar trên desktop)
  openFilter() {
    const sidebar = document.querySelector(".filters-sidebar");
    const overlay = document.getElementById("filterOverlay");

    if (sidebar && this.isMobile()) {
      // Mobile: hiển thị như bottom sheet
      sidebar.classList.add("active");
      if (overlay) overlay.classList.add("active");
      this.state.isOpen = true;
      document.body.style.overflow = "hidden";
    }
    // Desktop: sidebar luôn hiển thị, không cần làm gì
  },

  // Đóng filter
  closeFilter() {
    const sidebar = document.querySelector(".filters-sidebar");
    const overlay = document.getElementById("filterOverlay");

    if (sidebar) {
      sidebar.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      this.state.isOpen = false;
      document.body.style.overflow = "";
    }
  },

  // Toggle filter
  toggleFilter() {
    if (this.state.isOpen) {
      this.closeFilter();
    } else {
      this.openFilter();
    }
  },

  // Render filter UI (dùng chung cho cả desktop và mobile)
  renderFilterUI() {
    // Render filters vào container dùng chung
    const categoryContainer = document.querySelector(
      ".filter-group-categories",
    );
    const locationContainer = document.querySelector(".filter-group-locations");

    if (categoryContainer) {
      categoryContainer.innerHTML = this.generateCategoryCheckboxes();
    }

    if (locationContainer) {
      locationContainer.innerHTML = this.generateLocationCheckboxes();
    }

    // Đồng bộ checkbox và events
    this.syncCheckboxes();
    this.syncKeywordSearch();
    this.attachCollapseEvents();
  },

  // Gắn sự kiện collapse/expand
  attachCollapseEvents() {
    setTimeout(() => {
      const headers = document.querySelectorAll(".filter-group-header");
      headers.forEach((header) => {
        header.addEventListener("click", function () {
          const filterItems = this.nextElementSibling;
          const icon = this.querySelector("i");

          filterItems.classList.toggle("collapsed");
          icon.classList.toggle("bi-chevron-down");
          icon.classList.toggle("bi-chevron-up");
        });
      });
    }, 100);
  },

  // Đồng bộ checkbox
  syncCheckboxes() {
    setTimeout(() => {
      const checkboxes = document.querySelectorAll(".form-check-input");

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          // Sync với các checkbox cùng value
          const value = this.value;
          const isChecked = this.checked;

          document.querySelectorAll(`input[value="${value}"]`).forEach((cb) => {
            cb.checked = isChecked;
          });
        });
      });
    }, 100);
  },

  syncKeywordSearch() {
    setTimeout(() => {
      const keywordInputs = document.querySelectorAll(
        ".filter-group-keyword .form-control-sm",
      );
      const clearButtons = document.querySelectorAll(".filter-clear-btn");

      if (keywordInputs.length > 0) {
        // Đồng bộ giá trị giữa các ô tìm kiếm
        keywordInputs.forEach((input) => {
          input.addEventListener("input", function () {
            const value = this.value;
            keywordInputs.forEach((otherInput) => {
              if (otherInput !== this) {
                otherInput.value = value;
              }
            });

            // Hiển thị/hide nút clear
            const showClear = value.trim() !== "";
            clearButtons.forEach((btn) => {
              btn.style.display = showClear ? "block" : "none";
            });

            // Lưu keyword vào currentFilters
            JobFilter.currentFilters.keyword = value;
          });
        });

        // Xử lý nút clear
        clearButtons.forEach((btn) => {
          btn.addEventListener("click", function (e) {
            e.preventDefault();
            keywordInputs.forEach((input) => {
              input.value = "";
              this.style.display = "none";
            });
            keywordInputs[0].focus();
            JobFilter.currentFilters.keyword = "";
          });
        });
      }
    }, 100);
  },

  // Áp dụng filter
  applyFilters() {
    // Lấy filter values từ desktop hoặc mobile
    let selectedCategories = Array.from(
      document.querySelectorAll('.filters-sidebar .filter-group-categories input[type="checkbox"]:checked'),
    ).map((cb) => cb.value);
    
    let selectedLocations = Array.from(
      document.querySelectorAll('.filters-sidebar .filter-group-locations input[type="checkbox"]:checked'),
    ).map((cb) => cb.value);

    this.currentFilters.categories = selectedCategories;
    this.currentFilters.locations = selectedLocations;

    // Gọi callback để lọc jobs
    if (typeof window.filterJobsCallback === "function") {
      window.filterJobsCallback(this.currentFilters);
    }

    // Đóng filter trên mobile sau khi áp dụng
    if (this.isMobile()) {
      this.closeFilter();
    }

    // Cuộn lên đầu trang
    if (typeof scrollToTop === "function") {
      scrollToTop();
    }

    // Hiển thị thông báo
    if (typeof showToast !== "undefined") {
      showToast("Đã áp dụng bộ lọc!", "info");
    }
  },

  // Gắn sự kiện filter buttons
  attachFilterEvents() {
    const applyFiltersBtn = document.getElementById("applyFilters");
    const clearFiltersBtn = document.getElementById("clearFilters");
    const mobileFilterBtn = document.getElementById("mobileFilterBtn");
    const filterOverlay = document.getElementById("filterOverlay");
    const sidebar = document.querySelector(".filters-sidebar");
    const filterCloseBtn = document.querySelector(".filter-close-btn"); // Thêm dòng này

    // Apply filters
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener("click", function (e) {
        e.preventDefault();
        JobFilter.applyFilters();
      });
    }

    // Clear filters
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", function (e) {
        e.preventDefault();
        JobFilter.clearFilters();
      });
    }

    // Mobile filter button
    if (mobileFilterBtn) {
      mobileFilterBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        JobFilter.toggleFilter();
      });
    }

    // Close filter when clicking overlay
    if (filterOverlay) {
      filterOverlay.addEventListener("click", function () {
        JobFilter.closeFilter();
      });
    }

    // Close filter when clicking close button
    if (filterCloseBtn) {
      filterCloseBtn.addEventListener("click", function (e) {
        e.preventDefault();
        JobFilter.closeFilter();
      });
    }

    // Close filter when clicking outside content
    if (sidebar) {
      sidebar.addEventListener("click", function (e) {
        if (e.target === sidebar && JobFilter.isMobile()) {
          JobFilter.closeFilter();
        }
      });
    }

    // Close filter on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && JobFilter.state.isOpen) {
        JobFilter.closeFilter();
      }
    });

    // Close filter when clicking outside (global click handler)
    document.addEventListener("click", (e) => {
      const sidebar = document.querySelector(".filters-sidebar");
      const mobileFilterBtn = document.getElementById("mobileFilterBtn");

      if (
        JobFilter.state.isOpen &&
        sidebar &&
        !e.target.closest(".filters-sidebar") &&
        e.target !== mobileFilterBtn &&
        !e.target.closest("#mobileFilterBtn")
      ) {
        JobFilter.closeFilter();
      }
    });
  },

  // Xóa tất cả filter
  clearFilters() {
    // Clear tất cả checkboxes trong desktop
    document
      .querySelectorAll('.filters-sidebar input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });

    // Clear keyword input
    const keywordInputs = document.querySelectorAll(
      ".filter-group-keyword .form-control-sm",
    );
    keywordInputs.forEach((input) => {
      input.value = "";
    });

    this.currentFilters = { categories: [], locations: [], keyword: "" };

    // Gọi callback để reset jobs
    if (typeof window.resetJobsCallback === "function") {
      window.resetJobsCallback();
    }

    // Đóng filter trên mobile sau khi xóa
    if (this.isMobile()) {
      this.closeFilter();
    }

    // Cuộn lên đầu trang
    if (typeof scrollToTop === "function") {
      scrollToTop();
    }

    // Hiển thị thông báo
    if (typeof showToast !== "undefined") {
      showToast("Đã xóa tất cả bộ lọc!", "info");
    }
  },

  // Cập nhật hiển thị tổng hợp các tiêu chí filter đang chọn - ĐÃ ĐƠN GIẢN HÓA
  updateActiveFiltersDisplay() {
    // Không tạo badge nữa, chỉ giữ lại để không bị lỗi nếu có code khác phụ thuộc
    const jobsHeader = document.querySelector(".jobs-header");
    if (!jobsHeader) return;

    // Tìm container cho active filters
    let activeFiltersContainer = jobsHeader.querySelector(
      ".active-filters-container",
    );
    if (!activeFiltersContainer) {
      activeFiltersContainer = document.createElement("div");
      activeFiltersContainer.className = "active-filters-container";
      activeFiltersContainer.style.cssText =
        "display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; margin-bottom: 1rem;";
      jobsHeader.appendChild(activeFiltersContainer);
    }

    // Clear existing filters display
    activeFiltersContainer.innerHTML = "";

    // Luôn ẩn container vì không hiển thị badge
    activeFiltersContainer.style.display = "none";
  },

  // Xóa một filter cụ thể - ĐÃ ĐƠN GIẢN HÓA
  removeFilter(type, value) {
    if (type === "keyword") {
      this.currentFilters.keyword = "";
      // Clear input keyword
      const keywordInputs = document.querySelectorAll(
        ".filter-group-keyword .form-control-sm",
      );
      keywordInputs.forEach((input) => {
        input.value = "";
      });
    } else if (type === "category") {
      this.currentFilters.categories = this.currentFilters.categories.filter(
        (cat) => cat !== value,
      );
      // Bỏ check checkbox tương ứng
      document
        .querySelectorAll(`input[value="${value}"]`)
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    } else if (type === "location") {
      this.currentFilters.locations = this.currentFilters.locations.filter(
        (loc) => loc !== value,
      );
      // Bỏ check checkbox tương ứng
      document
        .querySelectorAll(`input[value="${value}"]`)
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    }

    // Gọi callback để cập nhật hiển thị jobs
    if (typeof window.filterJobsCallback === "function") {
      window.filterJobsCallback(this.currentFilters);
    }

    // Cuộn lên đầu trang
    if (typeof scrollToTop === "function") {
      scrollToTop();
    }
  },

  // Khởi tạo module
  init() {
    this.renderFilterUI();
    this.attachFilterEvents();
    // Không cần gọi updateActiveFiltersDisplay nữa vì đã bỏ
  },
};
