// slider.js - Module quản lý slider cho trang chủ (cập nhật)
const Slider = {
  // Biến trạng thái
  state: {
    sliders: {}, // Lưu trữ nhiều slider nếu cần
  },

  // Khởi tạo slider
  init: function (containerId, jobs, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Cấu hình mặc định
    const config = {
      itemsPerView: 3,
      autoPlay: false,
      interval: 4000,
      showNavButtons: true,
      ...options,
    };

    try {
      if (jobs.length > 0) {
        // Tạo HTML cho slider
        const sliderHTML = this.createSliderHTML(jobs, containerId, config);
        container.innerHTML = sliderHTML;

        // Lưu trữ slider instance
        this.state.sliders[containerId] = {
          currentIndex: 0,
          jobs: jobs,
          config: config,
          totalSlides: Math.ceil(jobs.length / config.itemsPerView),
          interval: null,
        };

        // Gắn sự kiện
        this.attachEvents(containerId);

        // Bắt đầu auto slide nếu được bật
        if (config.autoPlay) {
          this.startAutoSlide(containerId);
        }
      } else {
        container.innerHTML =
          '<div class="no-results">Không có công việc để hiển thị</div>';
      }
    } catch (error) {
      console.error("Error initializing slider:", error);
      container.innerHTML =
        '<div class="no-results">Không thể tải slider</div>';
    }
  },

createSliderHTML: function (jobs, containerId, config) {
  let slidesHTML = `
    <div class="jobs-slider-wrapper">
      <div class="jobs-slider-content" id="sliderContent_${containerId}">
  `;

  // Tạo các card job với class job-slide-item thay vì job-slide-card
  jobs.forEach((job, index) => {
    slidesHTML += `
      <div class="job-slide-item" data-index="${index}">
        ${this.createJobCardHTML(job)}
      </div>
    `;
  });

  slidesHTML += `
      </div>
    </div>
  `;

  // Thêm navigation buttons nếu được bật
  if (config.showNavButtons) {
    slidesHTML += `
      <button class="slider-nav-btn slider-prev-btn" id="prevBtn_${containerId}" aria-label="Slide trước">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button class="slider-nav-btn slider-next-btn" id="nextBtn_${containerId}" aria-label="Slide tiếp theo">
        <i class="bi bi-chevron-right"></i>
      </button>
    `;
  }

  return slidesHTML;
},

  // Tạo HTML cho từng card công việc
  createJobCardHTML: function (job) {
    let jobCardHTML = JobCardBuilder.createSimpleJobCard(job);

    // Wrap trong div có class để force mobile layout
    return `<div class="slider-job-card-wrapper">${jobCardHTML}</div>`;
  },

  // Gắn sự kiện cho slider
  attachEvents: function (containerId) {
    const sliderInstance = this.state.sliders[containerId];
    if (!sliderInstance) return;

    const prevBtn = document.getElementById(`prevBtn_${containerId}`);
    const nextBtn = document.getElementById(`nextBtn_${containerId}`);
    const sliderContent = document.getElementById(
      `sliderContent_${containerId}`,
    );

    // Gắn sự kiện cho nút Previous
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.prevSlide(containerId);
        this.stopAutoSlide(containerId);
      });
    }

    // Gắn sự kiện cho nút Next
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.nextSlide(containerId);
        this.stopAutoSlide(containerId);
      });
    }

    // Gắn sự kiện hover để tạm dừng auto slide
    const container = document.getElementById(containerId);
    if (container) {
      container.addEventListener("mouseenter", () => {
        this.stopAutoSlide(containerId);
      });

      container.addEventListener("mouseleave", () => {
        if (sliderInstance.config.autoPlay) {
          this.startAutoSlide(containerId);
        }
      });
    }

    // Update button states ban đầu
    this.updateNavButtons(containerId);
  },

  // Di chuyển đến slide tiếp theo
  nextSlide: function (containerId) {
    const sliderInstance = this.state.sliders[containerId];
    if (!sliderInstance) return;

    if (sliderInstance.currentIndex < sliderInstance.totalSlides - 1) {
      sliderInstance.currentIndex++;
      this.updateSliderPosition(containerId);
      this.updateNavButtons(containerId);
    }
  },

  // Di chuyển đến slide trước
  prevSlide: function (containerId) {
    const sliderInstance = this.state.sliders[containerId];
    if (!sliderInstance) return;

    if (sliderInstance.currentIndex > 0) {
      sliderInstance.currentIndex--;
      this.updateSliderPosition(containerId);
      this.updateNavButtons(containerId);
    }
  },

  // Cập nhật vị trí slider
  updateSliderPosition: function (containerId) {
    const sliderInstance = this.state.sliders[containerId];
    if (!sliderInstance) return;

    const sliderContent = document.getElementById(
      `sliderContent_${containerId}`,
    );
    if (!sliderContent) return;

    const itemWidth = 100 / sliderInstance.config.itemsPerView;
    const translateX = -(sliderInstance.currentIndex * 100);

    sliderContent.style.transform = `translateX(${translateX}%)`;
  },

  // Cập nhật trạng thái các nút navigation
  updateNavButtons: function (containerId) {
    const sliderInstance = this.state.sliders[containerId];
    if (!sliderInstance) return;

    const prevBtn = document.getElementById(`prevBtn_${containerId}`);
    const nextBtn = document.getElementById(`nextBtn_${containerId}`);

    if (prevBtn) {
      prevBtn.disabled = sliderInstance.currentIndex === 0;
    }

    if (nextBtn) {
      nextBtn.disabled =
        sliderInstance.currentIndex >= sliderInstance.totalSlides - 1;
    }
  },

  // Bắt đầu auto slide
  startAutoSlide: function (containerId) {
    const sliderInstance = this.state.sliders[containerId];
    if (!sliderInstance) return;

    // Dừng interval hiện tại nếu có
    this.stopAutoSlide(containerId);

    sliderInstance.interval = setInterval(() => {
      const nextIndex = sliderInstance.currentIndex + 1;
      if (nextIndex < sliderInstance.totalSlides) {
        sliderInstance.currentIndex = nextIndex;
        this.updateSliderPosition(containerId);
        this.updateNavButtons(containerId);
      } else {
        // Quay lại đầu nếu đến cuối
        sliderInstance.currentIndex = 0;
        this.updateSliderPosition(containerId);
        this.updateNavButtons(containerId);
      }
    }, sliderInstance.config.interval);
  },

  // Dừng auto slide
  stopAutoSlide: function (containerId) {
    const sliderInstance = this.state.sliders[containerId];
    if (sliderInstance && sliderInstance.interval) {
      clearInterval(sliderInstance.interval);
      sliderInstance.interval = null;
    }
  },

  // Hủy slider (dọn dẹp khi không cần nữa)
  destroy: function (containerId) {
    this.stopAutoSlide(containerId);
    delete this.state.sliders[containerId];
  },

  // Reset slider với dữ liệu mới
  reset: function (containerId, jobs, options = {}) {
    this.destroy(containerId);
    this.init(containerId, jobs, options);
  },
};
