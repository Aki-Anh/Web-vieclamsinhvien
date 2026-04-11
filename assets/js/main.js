// main.js - Script chính điều khiển toàn bộ website CTJobs

// ==================== HÀM CẬP NHẬT GIAO DIỆN NGƯỜNG DÙNG (GLOBAL) ====================
// Cập nhật hàm updateHeaderAuthUI
window.updateHeaderAuthUI = function() {
  const container = document.getElementById("authContainer");
  const guestTpl = document.getElementById("guestTemplate");
  const userTpl = document.getElementById("userTemplate");
  const employerTpl = document.getElementById("employerTemplate");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const isEmployer = localStorage.getItem("isEmployer") === "true";

  if (isLoggedIn && userInfo.email) {
    if (isEmployer) {
      // Giao diện cho nhà tuyển dụng
      if (employerTpl) {
        const clone = employerTpl.content.cloneNode(true);
        const userNameEl = clone.querySelector(".user-name");
        const userEmailEl = clone.querySelector(".user-email");
        const avatarEl = clone.querySelector(".user-avatar");
        
        if (userNameEl) {
          userNameEl.textContent = userInfo.name || userInfo.email.split('@')[0];
        }
        if (userEmailEl) {
          userEmailEl.textContent = userInfo.email;
        }
        if (avatarEl) {
          avatarEl.src = "https://placehold.co/40x40";
        }
        container.innerHTML = "";
        container.appendChild(clone);

        setTimeout(() => {
          const logoutBtn = container.querySelector("#logoutBtn");
          if (logoutBtn) {
            const newBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
            
            newBtn.addEventListener("click", (e) => {
              e.preventDefault();
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("userInfo");
              localStorage.removeItem("isEmployer");
              window.location.reload();
            });
          }
        }, 100);
      }
    } else {
      // Giao diện cho ứng viên
      if (userTpl) {
        const clone = userTpl.content.cloneNode(true);
        const userNameEl = clone.querySelector(".user-name");
        const userEmailEl = clone.querySelector(".user-email");
        const avatarEl = clone.querySelector(".user-avatar");
        
        if (userNameEl) {
          userNameEl.textContent = userInfo.name || userInfo.email.split('@')[0];
        }
        if (userEmailEl) {
          userEmailEl.textContent = userInfo.email;
        }
        if (avatarEl) {
          avatarEl.src = "https://placehold.co/40x40";
        }
        container.innerHTML = "";
        container.appendChild(clone);

        setTimeout(() => {
          const dropdown = container.querySelector('.dropdown-toggle');
          const menu = container.querySelector('.dropdown-menu');
          if (dropdown && menu) {
            dropdown.addEventListener('click', (e) => {
              e.stopPropagation();
              menu.classList.toggle('show');
            });

            document.addEventListener('click', (e) => {
              if (!container.contains(e.target)) menu.classList.remove('show');
            });
          }

          const logoutBtn = container.querySelector("#logoutBtn");
          if (logoutBtn) {
            const newBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
            
            newBtn.addEventListener("click", (e) => {
              e.preventDefault();
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("userInfo");
              localStorage.removeItem("isEmployer");
              window.location.reload();
            });
          }
        }, 100);
      }
    }
  } else {
    if (guestTpl) {
      const clone = guestTpl.content.cloneNode(true);
      const loginBtn = clone.querySelector(".login-trigger");
      if (loginBtn) {
        const newBtn = loginBtn.cloneNode(true);
        loginBtn.parentNode.replaceChild(newBtn, loginBtn);
        
        newBtn.addEventListener("click", (e) => {
          e.preventDefault();
          if (typeof LoginPanel !== "undefined") LoginPanel.open();
        });
      }
      container.innerHTML = "";
      container.appendChild(clone);
    }
  }
};


// Cập nhật hàm updateOffcanvasAuthUI
// Cập nhật hàm updateOffcanvasAuthUI
window.updateOffcanvasAuthUI = function() {
  const header = document.querySelector(".offcanvas-header");
  const footer = document.querySelector(".offcanvas-footer");
  const navList = document.querySelector(".offcanvas-nav");
  const guestButtonsTpl = document.getElementById("offcanvasGuestButtonsTemplate");
  const logoutTpl = document.getElementById("offcanvasLogoutTemplate");

  // Kiểm tra xem các phần tử có tồn tại không
  if (!header || !footer || !navList) return;

  // Xóa các item cũ nếu có
  const existingUserHeader = header.querySelector('.offcanvas-user-header');
  const existingProfileBtn = header.querySelector('.profile-btn');
  const existingGuestButtons = footer.querySelector('.offcanvas-guest-buttons');
  const existingLogoutBtn = footer.querySelector('.offcanvas-logout-btn');
  
  if (existingUserHeader) existingUserHeader.remove();
  if (existingProfileBtn) existingProfileBtn.remove();
  if (existingGuestButtons) existingGuestButtons.remove();
  if (existingLogoutBtn) existingLogoutBtn.remove();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const isEmployer = localStorage.getItem("isEmployer") === "true";

  if (isLoggedIn && userInfo.email) {
    // Khi đã đăng nhập: thêm thông tin user vào header
    header.classList.add('with-user-info');
    
    // Tạo user profile trong header
    const userHeader = document.createElement('div');
    userHeader.className = 'offcanvas-user-header';
    userHeader.innerHTML = `
      <img src="https://placehold.co/40x40" alt="Avatar" class="user-avatar-small">
      <div class="user-info">
        <div class="user-name">${userInfo.name || userInfo.email.split('@')[0]}${isEmployer ? ' (NTD)' : ''}</div>
        <div class="user-email">${userInfo.email}</div>
      </div>
    `;
    
    // Thêm vào header (sau tiêu đề)
    const titleElement = header.querySelector('.offcanvas-title');
    if (titleElement) {
      titleElement.parentNode.insertBefore(userHeader, titleElement.nextSibling);
    } else {
      header.appendChild(userHeader);
    }
    
    // Thêm profile button vào header (sau user info)
    const profileBtn = document.createElement('button');
    profileBtn.className = 'profile-btn btn btn-secondary';
    profileBtn.id = 'profileBtnMobile';
    profileBtn.innerHTML = `
      <i class="bi bi-person"></i>
      <span>Hồ sơ</span>
    `;
    
    // Thêm vào header (sau user info)
    if (userHeader) {
      userHeader.parentNode.insertBefore(profileBtn, userHeader.nextSibling);
    } else {
      header.appendChild(profileBtn);
    }
    
    // Thêm logout button vào footer (trước phần tuyển dụng)
    if (logoutTpl) {
      const logoutClone = logoutTpl.content.cloneNode(true);
      const employerCTA = footer.querySelector('.offcanvas-employer');
      
      // Thêm logout button trước employer CTA
      if (employerCTA) {
        footer.insertBefore(logoutClone, employerCTA);
      } else {
        footer.appendChild(logoutClone);
      }
      
      // Thêm sự kiện cho nút profile
      setTimeout(() => {
        const profileBtn = document.getElementById("profileBtnMobile");
        if (profileBtn) {
          const newBtn = profileBtn.cloneNode(true);
          profileBtn.parentNode.replaceChild(newBtn, profileBtn);
          
          newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Đóng offcanvas menu
            if (typeof Offcanvas !== "undefined") {
              Offcanvas.closeMenu();
            }
            // Chuyển hướng đến trang hồ sơ
            window.location.href = "./pages/profile.html";
          });
        }
        
        // Thêm sự kiện cho nút logout
        const logoutBtn = document.getElementById("logoutBtnMobile");
        if (logoutBtn) {
          const newBtn = logoutBtn.cloneNode(true);
          logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
          
          newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("isEmployer");
            window.location.reload();
          });
        }
      }, 100);
    }
  } else {
    // Khi chưa đăng nhập: thêm buttons vào footer
    header.classList.remove('with-user-info');
    
    // Xóa các elements trong header nếu có
    const existingUserHeader = header.querySelector('.offcanvas-user-header');
    const existingProfileBtn = header.querySelector('.profile-btn');
    if (existingUserHeader) existingUserHeader.remove();
    if (existingProfileBtn) existingProfileBtn.remove();
    
    // Thêm guest buttons vào footer
    if (guestButtonsTpl) {
      const guestClone = guestButtonsTpl.content.cloneNode(true);
      const employerCTA = footer.querySelector('.offcanvas-employer');
      
      // Thêm guest buttons trước employer CTA
      if (employerCTA) {
        footer.insertBefore(guestClone, employerCTA);
      } else {
        footer.appendChild(guestClone);
      }
      
      // Thêm sự kiện cho nút login
      setTimeout(() => {
        const loginBtn = footer.querySelector(".login-trigger-mobile");
        if (loginBtn) {
          const newBtn = loginBtn.cloneNode(true);
          loginBtn.parentNode.replaceChild(newBtn, loginBtn);
          
          newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (typeof Offcanvas !== "undefined") {
              Offcanvas.closeMenu();
            }
            if (typeof LoginPanel !== "undefined") {
              LoginPanel.open();
            }
          });
        }
      }, 100);
    }
  }
};



// ==================== IIFE CHÍNH ====================
(function () {
  "use strict";

  // ==================== BIẾN TOÀN CỤC ====================
  let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

  // ==================== HÀM TIỆN ÍCH ====================
  function showToast(message, type) {
    if (typeof Toast !== "undefined" && Toast[type]) {
      Toast[type](message);
    } else {
      alert(message);
    }
  }

  function saveJobsToStorage() {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== KHỞI TẠO TRANG ====================
  function initHomePage() {
    if (!document.body.classList.contains("home-page")) return;

    document.querySelectorAll(".hero-search form").forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="text"]');
        const keyword = input ? input.value.trim() : "";
        if (keyword) {
          window.location.href = `./pages/jobs.html?search=${encodeURIComponent(keyword)}`;
        }
      });
    });

    document.querySelectorAll(".popular-keyword").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const keyword = link.textContent;
        window.location.href = `./pages/jobs.html?search=${encodeURIComponent(keyword)}`;
      });
    });
    
    loadFeaturedJobs();
    loadLatestJobs();
    loadFeaturedJobsSlider();
    loadLatestJobsGrid();
  }

  
function loadFeaturedJobs() {
    const container = document.getElementById('featuredJobs');
    if (!container) return;

    try {
        const allJobs = JobData.getAllJobs();
        const featuredJobs = allJobs.slice(0, 6);
        
        if (featuredJobs.length > 0) {
            const html = JobCardBuilder.buildJobList(featuredJobs, "jobs", []);
            container.innerHTML = html;
            attachHomeJobActions();
        } else {
            container.innerHTML = '<div class="no-results">Không có công việc nổi bật</div>';
        }
    } catch (error) {
        console.error('Error loading featured jobs:', error);
        container.innerHTML = '<div class="no-results">Không thể tải công việc nổi bật</div>';
    }
}

function loadLatestJobs() {
    const container = document.getElementById('latestJobs');
    if (!container) return;

    try {
        const allJobs = JobData.getAllJobs();
        const latestJobs = [...allJobs]
            .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
            .slice(0, 6);
        
        if (latestJobs.length > 0) {
            const html = JobCardBuilder.buildJobList(latestJobs, "jobs", []);
            container.innerHTML = html;
            attachHomeJobActions();
        } else {
            container.innerHTML = '<div class="no-results">Không có công việc mới</div>';
        }
    } catch (error) {
        console.error('Error loading latest jobs:', error);
        container.innerHTML = '<div class="no-results">Không thể tải công việc mới nhất</div>';
    }
}

// Trong phần loadFeaturedJobs, cập nhật hàm attachHomeJobActions:
function attachHomeJobActions() {
    // Add click handlers for job cards on home page
    document.querySelectorAll('#featuredJobs .job-title a, #latestJobs .job-title a').forEach(link => {
        const jobId = link.closest('.job-item').querySelector('[data-job-id]').dataset.jobId;
        link.href = `./pages/job-detail.html?id=${jobId}`;
    });

    // Add click handlers for view buttons
    document.querySelectorAll('#featuredJobs .view-job-btn, #latestJobs .view-job-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobId = this.dataset.jobId;
            window.location.href = `./pages/job-detail.html?id=${jobId}`;
        });
    });
    
    // Add click handlers for save buttons
    document.querySelectorAll('#featuredJobs .save-job-btn, #latestJobs .save-job-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const jobId = parseInt(this.dataset.jobId);
            const icon = this.querySelector("i");
            
            if (icon && icon.classList.contains("bi-bookmark")) {
                // Lưu công việc
                icon.classList.remove("bi-bookmark");
                icon.classList.add("bi-bookmark-fill");
                icon.classList.add("text-warning");
                this.setAttribute("aria-label", "Bỏ lưu việc làm");
                
                const jobData = JobData.getJobById(jobId);
                if (jobData && !savedJobs.some((job) => job.id === jobId)) {
                    savedJobs.push(jobData);
                    saveJobsToStorage();
                    showToast("Đã lưu việc làm thành công!", "success");
                }
            } else if (icon) {
                // Bỏ lưu công việc
                icon.classList.remove("bi-bookmark-fill");
                icon.classList.remove("text-warning");
                icon.classList.add("bi-bookmark");
                this.setAttribute("aria-label", "Lưu việc làm");
                
                savedJobs = savedJobs.filter((job) => job.id !== jobId);
                saveJobsToStorage();
                showToast("Đã bỏ lưu việc làm!", "warning");
            }
        });
    });
    
    // Add click handlers for apply buttons
    document.querySelectorAll('#featuredJobs .apply-job-btn, #latestJobs .apply-job-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobId = parseInt(this.dataset.jobId);
            if (typeof LoginPanel !== "undefined") {
                LoginPanel.requireLogin(function () {
                    if (confirm("Bạn có chắc chắn muốn ứng tuyển cho công việc này?")) {
                        showToast("Bạn đã ứng tuyển thành công!", "success");
                    }
                });
            }
        });
    });
}

// Trong phần loadLatestJobsGrid, cập nhật hàm:
function loadLatestJobsGrid() {
    const container = document.getElementById('latestJobs');
    if (!container) return;

    try {
        const allJobs = JobData.getAllJobs();
        // Get latest 6 jobs
        const latestJobs = [...allJobs]
            .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
            .slice(0, 6);
        
        if (latestJobs.length > 0) {
            const html = JobCardBuilder.buildJobList(latestJobs, "jobs", savedJobs);
            container.innerHTML = html;
            attachHomeJobActions(); // Gắn sự kiện cho latest jobs
        } else {
            container.innerHTML = '<div class="no-results">Không có công việc mới</div>';
        }
    } catch (error) {
        console.error('Error loading latest jobs:', error);
        container.innerHTML = '<div class="no-results">Không thể tải công việc mới nhất</div>';
    }
}

// Trong phần loadFeaturedJobsSlider, cập nhật hàm attachSliderJobActions:
function attachSliderJobActions() {
    // Gắn sự kiện cho các nút trong slider
    document.querySelectorAll('#featuredJobsSlider .view-job-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const jobId = this.dataset.jobId;
            if (jobId) {
                window.location.href = `./pages/job-detail.html?id=${jobId}`;
            }
        });
    });
    
    document.querySelectorAll('#featuredJobsSlider .job-title a').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const jobId = this.closest('.job-item-content').querySelector('.view-job-btn').dataset.jobId;
            if (jobId) {
                window.location.href = `./pages/job-detail.html?id=${jobId}`;
            }
        });
    });
    
    // Gắn sự kiện cho nút lưu trong slider
    document.querySelectorAll('#featuredJobsSlider .save-job-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const jobId = parseInt(this.dataset.jobId);
            const icon = this.querySelector("i");
            
            if (icon && icon.classList.contains("bi-bookmark")) {
                icon.classList.remove("bi-bookmark");
                icon.classList.add("bi-bookmark-fill");
                icon.classList.add("text-warning");
                this.setAttribute("aria-label", "Bỏ lưu việc làm");
                
                const jobData = JobData.getJobById(jobId);
                if (jobData && !savedJobs.some((job) => job.id === jobId)) {
                    savedJobs.push(jobData);
                    saveJobsToStorage();
                    showToast("Đã lưu việc làm thành công!", "success");
                }
            } else if (icon) {
                icon.classList.remove("bi-bookmark-fill");
                icon.classList.remove("text-warning");
                icon.classList.add("bi-bookmark");
                this.setAttribute("aria-label", "Lưu việc làm");
                
                savedJobs = savedJobs.filter((job) => job.id !== jobId);
                saveJobsToStorage();
                showToast("Đã bỏ lưu việc làm!", "warning");
            }
        });
    });
    
    // Gắn sự kiện cho nút ứng tuyển trong slider
    document.querySelectorAll('#featuredJobsSlider .apply-job-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobId = parseInt(this.dataset.jobId);
            if (typeof LoginPanel !== "undefined") {
                LoginPanel.requireLogin(function () {
                    if (confirm("Bạn có chắc chắn muốn ứng tuyển cho công việc này?")) {
                        showToast("Bạn đã ứng tuyển thành công!", "success");
                    }
                });
            }
        });
    });
}


  function initJobsPage() {
    if (!document.body.classList.contains("jobs-page")) return;

    Pagination.init(
        { itemsPerPage: 6, containerId: 'paginationContainer' },
        handlePageChange
    );

    let currentJobs = [];

    function handlePageChange(page) {
        renderCurrentPageJobs();
        document.querySelector('.jobs-header').scrollIntoView({ behavior: 'smooth' });
    }

    function renderCurrentPageJobs() {
        const { startIndex, endIndex } = Pagination.getCurrentPageItemsRange();
        const jobsToShow = currentJobs.slice(startIndex, endIndex);

        if (jobsToShow.length === 0) {
            document.querySelector(".jobs-list").innerHTML = '<div class="no-results">Không tìm thấy công việc phù hợp</div>';
        } else {
            const html = JobCardBuilder.buildJobList(jobsToShow, "jobs", savedJobs);
            document.querySelector(".jobs-list").innerHTML = html;
            attachJobActions();
        }
    }

    function renderJobs(jobs) {
        currentJobs = jobs;
        updateJobsCount(jobs.length);
        Pagination.update(jobs.length).render();
        renderCurrentPageJobs();
    }

    function updateJobsCount(count) {
        const countElement = document.getElementById("jobsCount");
        if (countElement) {
            if (count !== 0) {
                countElement.innerHTML = `Hiển thị <strong>${count}</strong> việc làm phù hợp`;
            } else {
                countElement.innerHTML = `Không có công việc phù hợp với kết quả`;
            }
        }
    }

    function attachJobActions() {
      document.querySelectorAll(".apply-job-btn").forEach((btn) => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const jobId = parseInt(this.dataset.jobId);
          if (typeof LoginPanel !== "undefined") {
            LoginPanel.requireLogin(function () {
              if (confirm("Bạn có chắc chắn muốn ứng tuyển cho công việc này?")) {
                showToast("Bạn đã ứng tuyển thành công!", "success");
              }
            });
          }
        });
      });

      document.querySelectorAll(".save-job-btn").forEach((btn) => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          const jobId = parseInt(this.dataset.jobId);
          const icon = this.querySelector("i");

          if (icon && icon.classList.contains("bi-bookmark")) {
            icon.classList.remove("bi-bookmark");
            icon.classList.add("bi-bookmark-fill");
            icon.classList.add("text-warning");
            this.setAttribute("aria-label", "Bỏ lưu việc làm");

            const jobData = JobData.getJobById(jobId);
            if (jobData && !savedJobs.some((job) => job.id === jobId)) {
              savedJobs.push(jobData);
              saveJobsToStorage();
              showToast("Đã lưu việc làm thành công!", "success");
            }
          } else if (icon) {
            icon.classList.remove("bi-bookmark-fill");
            icon.classList.remove("text-warning");
            icon.classList.add("bi-bookmark");
            this.setAttribute("aria-label", "Lưu việc làm");

            savedJobs = savedJobs.filter((job) => job.id !== jobId);
            saveJobsToStorage();
            showToast("Đã bỏ lưu việc làm!", "warning");
          }
        });
      });

      document.querySelectorAll(".view-job-btn").forEach((btn) => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const jobId = parseInt(this.dataset.jobId);
          window.location.href = `job-detail.html?id=${jobId}`;
        });
      });
    }

function attachSortEvents() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      sortJobs(this.value);
    });
  }
}


    function sortJobs(sortBy) {
      let jobs = JobData.getAllJobs();
      if (typeof JobFilter !== "undefined") {
        jobs = applyCurrentFilters(jobs, JobFilter.currentFilters);
      }

      switch (sortBy) {
        case "salary":
          jobs.sort((a, b) => {
            const aSalaryNum = parseInt(a.salary.replace(/\D/g, "")) || 0;
            const bSalaryNum = parseInt(b.salary.replace(/\D/g, "")) || 0;
            return bSalaryNum - aSalaryNum;
          });
          break;
        case "urgent":
          jobs = jobs.filter((job) => job.badges && job.badges.includes("URGENT"));
          break;
        default:
          jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      }

      Pagination.resetToFirstPage();
      renderJobs(jobs);
    }

    window.filterJobsCallback = function (filters) {
      const allJobs = JobData.getAllJobs();
      const filteredJobs = applyCurrentFilters(allJobs, filters);
      Pagination.resetToFirstPage();
      renderJobs(filteredJobs);
    };

    window.resetJobsCallback = function () {
      Pagination.resetToFirstPage();
      renderJobs(JobData.getAllJobs());
      scrollToTop();
    };

function applyCurrentFilters(jobs, filters) {
  let filteredJobs = jobs;
  
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase().trim();
    if (keyword) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.category.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword) ||
        (job.description && job.description.some(desc => 
          desc.toLowerCase().includes(keyword)))
      );
    }
  }
  
  return filteredJobs.filter((job) => {
    const matchCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(job.category.toLowerCase());
    const matchLocation =
      filters.locations.length === 0 ||
      filters.locations.some((loc) =>
        job.location.toLowerCase().replace(/\s+/g, "").includes(loc),
      );
    return matchCategory && matchLocation;
  });
}

window.filterJobsCallback = function (filters) {
  const allJobs = JobData.getAllJobs();
  const filteredJobs = applyCurrentFilters(allJobs, filters);
  Pagination.resetToFirstPage();
  renderJobs(filteredJobs);
};

window.resetJobsCallback = function () {
  Pagination.resetToFirstPage();
  renderJobs(JobData.getAllJobs());
  scrollToTop();
  
  const desktopKeyword = document.getElementById("desktopKeywordFilter");
  const mobileKeyword = document.getElementById("mobileKeywordFilter");
  const mobileClearBtn = document.querySelector('.mobile-clear-search');
  
  if (desktopKeyword) desktopKeyword.value = "";
  if (mobileKeyword) mobileKeyword.value = "";
  if (mobileClearBtn) mobileClearBtn.style.display = "none";
};


    function attachSearchEvents() {
      const searchForm = document.getElementById("jobSearchForm");

      if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const keywordInput = this.querySelector('input[type="text"]');
          const keyword = keywordInput ? keywordInput.value : "";
          searchJobs(keyword);
        });
      }

      document.querySelectorAll(".popular-keyword").forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const keyword = this.textContent;
          searchJobs(keyword);
          const searchInput = document.querySelector('#jobSearchForm input[type="text"]');
          if (searchInput) {
            searchInput.value = keyword;
            const clearSearchBtn = document.getElementById("clearSearchBtn");
            if (clearSearchBtn) {
              clearSearchBtn.style.display = "block";
            }
          }
        });
      });
    }

    function searchJobs(keyword) {
      if (!keyword.trim()) {
        Pagination.resetToFirstPage();
        renderJobs(JobData.getAllJobs());
        return;
      }

      const filteredJobs = JobData.searchJobs(keyword);
      Pagination.resetToFirstPage();
      renderJobs(filteredJobs);
      scrollToTop();
    }

    function attachClearSearchEvent() {
      const searchInput = document.getElementById("searchInput");
      const clearSearchBtn = document.getElementById("clearSearchBtn");

      if (searchInput && clearSearchBtn) {
        searchInput.addEventListener("input", function () {
          if (this.value.trim() !== "") {
            clearSearchBtn.style.display = "block";
          } else {
            clearSearchBtn.style.display = "none";
          }
        });

        clearSearchBtn.addEventListener("click", function (e) {
          e.preventDefault();
          searchInput.value = "";
          clearSearchBtn.style.display = "none";
          searchInput.focus();
          Pagination.resetToFirstPage();
          renderJobs(JobData.getAllJobs());
        });

        clearSearchBtn.style.display = "none";
      }
    }

    Pagination.resetToFirstPage();
    renderJobs(JobData.getAllJobs());

    if (typeof JobFilter !== "undefined") {
      JobFilter.init();
    }

    attachSortEvents();
    attachSearchEvents();
    attachClearSearchEvent();
  }

  function initSavedJobsPage() {
    if (!document.querySelector(".saved-jobs-section")) return;

    const container = document.getElementById("savedJobsContainer");
    const emptyState = document.getElementById("emptyState");
    const countElement = document.getElementById("count");
    const searchInput = document.getElementById("searchInput");
    let jobIdToRemove = null;

    function displayJobs(jobs) {
      if (countElement) countElement.textContent = jobs.length;

      if (jobs.length === 0) {
        if (container) container.innerHTML = "";
        if (emptyState) emptyState.style.display = "block";
        return;
      }

      if (emptyState) emptyState.style.display = "none";
      if (container) {
        const html = JobCardBuilder.buildJobList(jobs, "saved");
        container.innerHTML = html;
        attachRemoveListeners();
        attachApplyButtons();
      }
    }

    function attachRemoveListeners() {
      document.querySelectorAll(".save-job-btn").forEach((btn) => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          const jobId = parseInt(this.dataset.jobId);
          showModal(jobId);
        });
      });
    }

    function attachApplyButtons() {
      document.querySelectorAll(".apply-job-btn").forEach((btn) => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const jobId = parseInt(this.dataset.jobId);
          if (typeof LoginPanel !== "undefined") {
            LoginPanel.requireLogin(function () {
              if (confirm("Bạn có chắc chắn muốn ứng tuyển cho công việc này?")) {
                showToast("Bạn đã ứng tuyển thành công!", "success");
              }
            });
          }
        });
      });
    }

    function showModal(jobId) {
      jobIdToRemove = jobId;
      if (typeof Modal !== "undefined" && document.getElementById("confirmationModal")) {
        Modal.show("confirmationModal");
      } else {
        if (confirm("Bạn có chắc chắn muốn bỏ lưu việc làm này không?")) {
          removeJob(jobId);
        }
      }
    }

    function removeJob(jobId) {
      savedJobs = savedJobs.filter((job) => job.id !== jobId);
      saveJobsToStorage();
      displayJobs(savedJobs);

      if (typeof Modal !== "undefined" && document.getElementById("confirmationModal")) {
        Modal.hide("confirmationModal");
      }
      jobIdToRemove = null;
      showToast("Đã bỏ lưu việc làm!", "info");
    }

    function setupModalListeners() {
      const confirmRemoveBtn = document.getElementById("confirmRemove");
      if (confirmRemoveBtn) {
        const newBtn = confirmRemoveBtn.cloneNode(true);
        confirmRemoveBtn.parentNode.replaceChild(newBtn, confirmRemoveBtn);
        newBtn.addEventListener("click", function () {
          if (jobIdToRemove !== null) {
            removeJob(jobIdToRemove);
          }
        });
      }

      const cancelModalBtn = document.getElementById("cancelModal");
      if (cancelModalBtn) {
        const newBtn = cancelModalBtn.cloneNode(true);
        cancelModalBtn.parentNode.replaceChild(newBtn, cancelModalBtn);
        newBtn.addEventListener("click", function () {
          if (typeof Modal !== "undefined" && document.getElementById("confirmationModal")) {
            Modal.hide("confirmationModal");
          }
          jobIdToRemove = null;
        });
      }

      document.addEventListener("click", function (event) {
        const modal = document.getElementById("confirmationModal");
        if (modal && event.target === modal) {
          if (typeof Modal !== "undefined") {
            Modal.hide("confirmationModal");
          }
          jobIdToRemove = null;
        }
      });
    }

    function searchJobs() {
      const term = searchInput ? searchInput.value.toLowerCase() : "";
      const results = savedJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.category.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term),
      );
      displayJobs(results);
    }

    const searchForm = document.getElementById("savedJobsSearchForm");
    const searchButton = document.getElementById("searchButton");

    if (searchForm) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        searchJobs();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", searchJobs);
    }
    setupModalListeners();
    displayJobs(savedJobs);
  }

  function initJobDetailPage() {
    if (!document.body.classList.contains("job-detail-page")) return;

    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get("id");

    if (!jobId) {
      document.querySelector(".container").innerHTML =
        '<div class="alert alert-danger">Không tìm thấy thông tin công việc!</div>';
      return;
    }

    const job = JobData.getJobById(jobId);
    if (!job) {
      document.querySelector(".container").innerHTML =
        '<div class="alert alert-danger">Không tìm thấy thông tin công việc!</div>';
      return;
    }

    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const isSaved = savedJobs.some((savedJob) => savedJob.id === job.id);

    if (typeof JobDetailRenderer !== "undefined") {
      JobDetailRenderer.renderJobDetail(job, isSaved);
    }

    const breadcrumbItem = document.querySelector(".breadcrumb-item.active");
    if (breadcrumbItem) {
      breadcrumbItem.textContent = job.title;
    }
  }

  // ==================== SLIDER FUNCTIONS ====================
function loadFeaturedJobsSlider() {
    const container = document.getElementById('featuredJobsSlider');
    if (!container) return;

    try {
        const allJobs = JobData.getAllJobs();
        const featuredJobs = allJobs.slice(0, 12);
        
        if (typeof Slider !== "undefined") {
            Slider.init('featuredJobsSlider', featuredJobs, {
                itemsPerView: 3,
                autoPlay: true,
                interval: 4000,
                showNavButtons: true
            });
            
            setTimeout(() => {
                attachSliderJobActions();
            }, 100);
        } else {
            container.innerHTML = '<div class="no-results">Không thể tải slider</div>';
        }
        
    } catch (error) {
        console.error('Error loading featured jobs slider:', error);
        if (container) {
            container.innerHTML = '<div class="no-results">Không thể tải slider công việc nổi bật</div>';
        }
    }
}

function attachSliderJobActions() {
    document.querySelectorAll('#featuredJobsSlider .view-job-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const jobId = this.dataset.jobId;
            if (jobId) {
                window.location.href = `./pages/job-detail.html?id=${jobId}`;
            }
        });
    });
    
    document.querySelectorAll('#featuredJobsSlider .job-title a').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const jobId = this.closest('.job-item-content').querySelector('.view-job-btn').dataset.jobId;
            if (jobId) {
                window.location.href = `./pages/job-detail.html?id=${jobId}`;
            }
        });
    });
}

  function loadLatestJobsGrid() {
    const container = document.getElementById('latestJobsGrid');
    if (!container) return;

    try {
        const allJobs = JobData.getAllJobs();
        const latestJobs = [...allJobs]
            .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
            .slice(0, 6);
        
        if (latestJobs.length > 0) {
            const html = JobCardBuilder.buildJobList(latestJobs, "jobs", []);
            container.innerHTML = html;
            
            document.querySelectorAll('#latestJobsGrid .view-job-btn').forEach(btn => {
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const jobId = this.dataset.jobId;
                    window.location.href = `./pages/job-detail.html?id=${jobId}`;
                });
            });
        } else {
            container.innerHTML = '<div class="no-results">Không có công việc mới</div>';
        }
    } catch (error) {
        console.error('Error loading latest jobs:', error);
        container.innerHTML = '<div class="no-results">Không thể tải công việc mới nhất</div>';
    }
  }

  function attachLatestJobsActions() {
    document.querySelectorAll('#latestJobs .view-job-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobId = this.dataset.jobId;
            window.location.href = `./pages/job-detail.html?id=${jobId}`;
        });
    });
    
    document.querySelectorAll('#latestJobs .job-title a').forEach(link => {
        const jobId = link.closest('.job-item-content').querySelector('.view-job-btn').dataset.jobId;
        link.href = `./pages/job-detail.html?id=${jobId}`;
    });
  }

  // ==================== KHỞI TẠO CHUNG ====================
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof LoginPanel !== "undefined" && LoginPanel.init) LoginPanel.init();
    if (typeof Offcanvas !== "undefined" && Offcanvas.init) Offcanvas.init();

    initHomePage();
    initJobsPage();
    initSavedJobsPage();
    initJobDetailPage();

    updateHeaderAuthUI();
    updateOffcanvasAuthUI();
    
    handleNavigationLinks();
    
    // Kiểm tra và hiển thị giao diện nhà tuyển dụng nếu cần
    checkAndShowEmployerInterface();
  });

  // Hàm kiểm tra và hiển thị giao diện nhà tuyển dụng
  function checkAndShowEmployerInterface() {
    const isEmployer = localStorage.getItem("isEmployer") === "true";
    if (isEmployer) {
      document.body.classList.add('employer-view');
    }
  }

  // Hàm xử lý các liên kết chuyển trang
  function handleNavigationLinks() {
    const viewAllLinks = document.querySelectorAll('.view-all-link');
    viewAllLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = './pages/jobs.html';
      });
    });

    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('href').split('=')[1];
        window.location.href = `./pages/jobs.html?category=${category}`;
      });
    });

    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          window.location.href = href;
        }
      });
    });
  }

  window.addEventListener('beforeunload', () => {
    if (typeof Slider !== "undefined" && Slider.state && Slider.state.sliders) {
      Object.keys(Slider.state.sliders).forEach(containerId => {
        Slider.destroy(containerId);
      });
    }
  });
})();
