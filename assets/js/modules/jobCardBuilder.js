// Job Card Builder Module - Tập trung vào sự khác biệt giữa 2 trang
const JobCardBuilder = {
  // Cấu hình cho từng loại trang
  configs: {
    jobs: {
      getSaveButton: function (jobId, isSaved) {
        const icon = isSaved ? "bi-bookmark-fill text-warning" : "bi-bookmark";
        const label = isSaved ? "Bỏ lưu việc làm" : "Lưu việc làm";
        return `<button class="save-job-btn" data-job-id="${jobId}" aria-label="${label}">
                            <i class="bi ${icon}"></i>
                        </button>`;
      },
      getPostedTime: function (posted) {
        return posted;
      },
    },
    saved: {
      getSaveButton: function (jobId) {
        // Dùng biểu tượng thùng rác cho trang saved jobs
        return `<button class="save-job-btn" data-job-id="${jobId}" aria-label="Bỏ lưu việc làm">
                            <i class="bi bi-trash"></i>
                        </button>`;
      },
      getPostedTime: function (posted) {
        return posted || "1 ngày trước";
      },
    },
  },

  // Template chung cho job card
  createJobCardTemplate: function (job, config, isSaved = false) {
    console.log("Creating job card template for:", job.title);
    return `
        <article class="job-item">
            <div class="job-item-content">
                <div class="company-logo">
                    <img src="${job.logo}" alt="Logo công ty ${job.company}">
                </div>
                
                <div class="job-info">
                    <div class="job-title-section">
                        <h3 class="job-title">
                            <a href="#">${job.title}</a>
                        </h3>
                        ${config.getSaveButton(job.id, isSaved)}
                    </div>
                    
                    <p class="company-name">${job.company}</p>
                    <p class="salary">${job.salary}</p>
                    
                    <div class="job-tags">
                        <span class="badge">${job.category}</span>
                        <span class="badge">${job.location}</span>
                    </div>
                    
                    <div class="job-footer">
                        <small class="time-info">
                            <i class="bi bi-clock me-1"></i> Đăng ${config.getPostedTime(job.postedDate)}
                        </small>
                        <div class="job-actions">
                            <button class="btn btn-outline-primary view-job-btn" data-job-id="${job.id}">
                                <i class="bi bi-eye"></i> Xem
                            </button>
                            <button class="btn btn-primary apply-job-btn" data-job-id="${job.id}">
                                <i class="bi bi-send"></i> Ứng tuyển
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        `;
  },

  // Tạo job card cho trang jobs
  buildForJobsPage: function (job, savedJobs) {
    const isSaved = savedJobs.some((savedJob) => savedJob.id === job.id);
    console.log("Building jobs page card for:", job.title, "isSaved:", isSaved);
    return this.createJobCardTemplate(job, this.configs.jobs, isSaved);
  },

  // Tạo job card cho trang saved jobs
  buildForSavedPage: function (job) {
    console.log("Building saved page card for:", job.title);
    return this.createJobCardTemplate(job, this.configs.saved);
  },

  // Tạo danh sách job cards
  buildJobList: function (jobs, pageType, savedJobs = []) {
    console.log("buildJobList called with:", {
      jobs: jobs.length,
      pageType,
      savedJobs: savedJobs.length,
    });

    if (jobs.length === 0) {
      return '<div class="no-results">Không tìm thấy công việc phù hợp</div>';
    }

    let html = "";
    jobs.forEach((job, index) => {
      console.log("Processing job", index, ":", job.title);
      if (pageType === "jobs") {
        html += this.buildForJobsPage(job, savedJobs);
      } else if (pageType === "saved") {
        html += this.buildForSavedPage(job);
      }
    });
    console.log("Final HTML built length:", html.length);
    return html;
  },
};

// Thêm vào JobCardBuilder.js
JobCardBuilder.createSimpleJobCard = function(job) {
    return `
        <div class="job-item-content">
            <div class="company-logo">
                <img src="${job.logo}" alt="Logo công ty ${job.company}">
            </div>
            
            <div class="job-info">
                <div class="job-title-section">
                    <h3 class="job-title">
                        <a href="./pages/job-detail.html?id=${job.id}">${job.title}</a>
                    </h3>
                </div>
                
                <p class="company-name">${job.company}</p>
                <p class="salary">${job.salary}</p>
                
                <div class="job-tags">
                    <span class="badge">${job.category}</span>
                    <span class="badge">${job.location}</span>
                </div>
                
                <div class="job-footer">
                    <small class="time-info">
                        <i class="bi bi-clock me-1"></i> Đăng ${job.postedDate}
                    </small>
                    <div class="job-actions">
                        <button class="btn btn-outline-primary view-job-btn" data-job-id="${job.id}">
                            <i class="bi bi-eye"></i> Xem
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};
