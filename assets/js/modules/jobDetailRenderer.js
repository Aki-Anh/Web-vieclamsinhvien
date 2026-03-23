// jobDetailRenderer.js - Module render chi tiết công việc
const JobDetailRenderer = {
    // Render phần tổng quan công việc
    renderJobOverview(job, isSaved = false) {
        const badgesHtml = job.badges.map(badge => 
            `<span class="badge badge-${badge.toLowerCase()}">${badge}</span>`
        ).join('');
        
        const saveIcon = isSaved ? 'bi-bookmark-fill text-warning' : 'bi-bookmark';
        const saveLabel = isSaved ? 'Bỏ lưu việc làm' : 'Lưu việc làm';
        
        return `
        <div class="job-overview-header">
            <div class="job-basic-info">
                <div class="job-company-logo">
                    <img src="${job.logo}" alt="Logo công ty ${job.company}">
                </div>
                <div class="job-title-area">
                    <div class="job-title-badges">
                        <div class="job-badges-before">
                            ${badgesHtml}
                        </div>
                        <h1 class="job-title">${job.title}</h1>
                    </div>
                    <p class="company-name">${job.company}</p>
                    <div class="job-meta">
                        <span class="job-category">
                            <i class="bi bi-tag"></i>
                            ${job.category}
                        </span>
                        <span class="job-location">
                            <i class="bi bi-geo-alt"></i>
                            ${job.location}
                        </span>
                    </div>
                </div>
            </div>
            
            <!-- Save button ở góc trên phải -->
            <button class="save-job-btn" aria-label="${saveLabel}" data-job-id="${job.id}">
                <i class="bi ${saveIcon}"></i>
            </button>
        </div>
        
        <!-- Salary highlight - phù hợp Việt Nam -->
        <div class="job-salary-vn">
            <i class="bi bi-currency-dollar"></i>
            <span>${job.salary}</span>
        </div>
        
        <!-- Action buttons - phía dưới gần hạn nộp -->
        <div class="job-actions-bottom">
            <button class="btn btn-primary apply-now" data-job-id="${job.id}">
                Ứng tuyển ngay
            </button>
        </div>
        
        <!-- Deadline section - xuống dòng sớm -->
        <div class="job-deadline">
            <i class="bi bi-calendar-check"></i>
            <div class="job-deadline-content">
                <span><strong>Hạn nộp hồ sơ:</strong> ${job.deadline}</span>
                <span class="days-left">Còn ${job.daysLeft} ngày</span>
            </div>
        </div>
        `;
    },
    
    // Render nội dung chính
    renderMainContent(job) {
        return `
        <div class="job-section">
            <h2><i class="bi bi-file-text"></i> Mô tả công việc</h2>
            <ul>
                ${job.description.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="job-section">
            <h2><i class="bi bi-check-circle"></i> Yêu cầu công việc</h2>
            <ul>
                ${job.requirements.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="job-section">
            <h2><i class="bi bi-gift"></i> Quyền lợi</h2>
            <ul>
                ${job.benefits.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="job-section">
            <h2><i class="bi bi-info-circle"></i> Thông tin liên hệ</h2>
            <div class="contact-info-grid">
                <div class="contact-item">
                    <i class="bi bi-person"></i>
                    <div>
                        <strong>Người liên hệ:</strong>
                        <p>${job.contactInfo.name}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="bi bi-telephone"></i>
                    <div>
                        <strong>Số điện thoại:</strong>
                        <p>${job.contactInfo.phone}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="bi bi-envelope"></i>
                    <div>
                        <strong>Email:</strong>
                        <p>${job.contactInfo.email}</p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="bi bi-geo-alt"></i>
                    <div>
                        <strong>Địa chỉ:</strong>
                        <p>${job.contactInfo.address}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    },
    
    // Render sidebar
    renderSidebar(job) {
        return `
        <div class="sidebar-card">
            <h3><i class="bi bi-calendar"></i> Thông tin tuyển dụng</h3>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Ngày đăng</span>
                    <span class="info-value">${job.postedDate}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Hạn chót</span>
                    <span class="info-value">${job.deadline}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Kinh nghiệm</span>
                    <span class="info-value">${job.recruitmentInfo.experience}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Giới tính</span>
                    <span class="info-value">${job.recruitmentInfo.gender}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Tuổi</span>
                    <span class="info-value">${job.recruitmentInfo.age}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ca làm việc</span>
                    <span class="info-value">${job.recruitmentInfo.shifts}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Số lượng</span>
                    <span class="info-value">${job.recruitmentInfo.quantity}</span>
                </div>
            </div>
        </div>

        <div class="sidebar-card map-section">
            <h3><i class="bi bi-geo-alt"></i> Bản đồ vị trí</h3>
            <div class="map-placeholder">
                <iframe src="${job.mapEmbed}" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>

        <div class="sidebar-card related-jobs">
            <h3><i class="bi bi-collection"></i> Công việc tương tự</h3>
            <div class="related-job-list">
                <div class="related-job-item">
                    <h4>Nhân viên phục vụ bàn</h4>
                    <p class="company">Nhà hàng XYZ</p>
                    <div class="related-job-meta">
                        <span class="salary">20k - 25k/giờ</span>
                        <span class="location">Cái Răng</span>
                    </div>
                </div>
                <div class="related-job-item">
                    <h4>Phục vụ bàn part-time</h4>
                    <p class="company">Quán ăn ABC</p>
                    <div class="related-job-meta">
                        <span class="salary">15k - 20k/giờ</span>
                        <span class="location">Bình Thủy</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    },
    
    // Render toàn bộ trang chi tiết
    renderJobDetail(job, isSaved = false) {
        document.getElementById('jobOverview').innerHTML = this.renderJobOverview(job, isSaved);
        document.getElementById('jobMainContent').innerHTML = this.renderMainContent(job);
        document.getElementById('jobSidebar').innerHTML = this.renderSidebar(job);
        
        // Gắn sự kiện cho các nút
        this.attachEventListeners(job.id);
    },
    
    // Gắn sự kiện cho các nút
    attachEventListeners(jobId) {
        // Nút lưu công việc
        const saveBtn = document.querySelector('.save-job-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSaveJob(jobId, saveBtn);
            });
        }
        
        // Nút ứng tuyển
        const applyBtn = document.querySelector('.apply-now');
        if (applyBtn) {
            applyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleApplyJob(jobId);
            });
        }
    },
    
    // Xử lý lưu công việc
    handleSaveJob(jobId, button) {
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        const isCurrentlySaved = savedJobs.some(job => job.id === jobId);
        
        if (isCurrentlySaved) {
            // Bỏ lưu
            const updatedJobs = savedJobs.filter(job => job.id !== jobId);
            localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
            button.querySelector('i').className = 'bi bi-bookmark';
            button.setAttribute('aria-label', 'Lưu việc làm');
            if (typeof Toast !== 'undefined') {
                Toast.info('Đã bỏ lưu việc làm!');
            }
        } else {
            // Lưu công việc
            // Lấy thông tin công việc từ dữ liệu
            const job = JobData.getJobById(jobId);
            if (job) {
                savedJobs.push(job);
                localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
                button.querySelector('i').className = 'bi bi-bookmark-fill text-warning';
                button.setAttribute('aria-label', 'Bỏ lưu việc làm');
                if (typeof Toast !== 'undefined') {
                    Toast.success('Đã lưu việc làm thành công!');
                }
            }
        }
    },
    
    // Xử lý ứng tuyển
    handleApplyJob(jobId) {
        if (typeof LoginPanel !== 'undefined') {
            LoginPanel.requireLogin(() => {
                if (confirm('Bạn có chắc chắn muốn ứng tuyển cho công việc này?')) {
                    if (typeof Toast !== 'undefined') {
                        Toast.success('Bạn đã ứng tuyển thành công!');
                    }
                }
            });
        } else {
            alert('Vui lòng đăng nhập để ứng tuyển!');
        }
    }
};
