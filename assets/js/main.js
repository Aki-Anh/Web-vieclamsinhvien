(function () {
    'use strict';

    // ==================== GLOBAL VARIABLES ====================
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    let pendingAction = null; // Lưu action đang chờ sau khi đăng nhập

    // ==================== UTILITIES ====================
    function saveJobsToStorage() {
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }

    function showToast(message, type) {
        if (typeof Toast !== 'undefined' && Toast[type]) {
            Toast[type](message);
        } else {
            alert(message);
        }
    }

    // ==================== LOGIN PANEL FUNCTIONS ====================
    function isLoggedIn() {
        return LoginPanel.isLoggedIn();
    }

    function requireLogin(action) {
        LoginPanel.requireLogin(action);
    }

    // ==================== JOBS PAGE FUNCTIONS ====================
    function initJobsPage() {
        if (!document.body.classList.contains('jobs-page')) return;
        
        const jobsList = document.querySelector('.jobs-list');
        if (!jobsList) return;

        function renderJobs(jobs) {
            if (jobs.length === 0) {
                jobsList.innerHTML = '<div class="no-results">Không tìm thấy công việc phù hợp</div>';
                return;
            }
            
            const html = JobCardBuilder.buildJobList(jobs, 'jobs', savedJobs);
            jobsList.innerHTML = html;
            attachJobActions();
        }

        function attachJobActions() {
            // Apply job buttons - yêu cầu đăng nhập
            document.querySelectorAll('.apply-job-btn').forEach(btn => {
                // Loại bỏ sự kiện cũ nếu có
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const jobId = parseInt(this.dataset.jobId);
                    
                    requireLogin(function() {
                        if (confirm('Bạn có chắc chắn muốn ứng tuyển cho công việc này?')) {
                            showToast('Bạn đã ứng tuyển thành công!', 'success');
                        }
                    });
                });
            });

            // Save job buttons (không yêu cầu đăng nhập)
            document.querySelectorAll('.save-job-btn').forEach(btn => {
                // Loại bỏ sự kiện cũ nếu có
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const jobId = parseInt(this.dataset.jobId);
                    const icon = this.querySelector('i');
                    
                    if (icon && icon.classList.contains('bi-bookmark')) {
                        // Save job
                        icon.classList.remove('bi-bookmark');
                        icon.classList.add('bi-bookmark-fill');
                        icon.classList.add('text-warning');
                        this.setAttribute('aria-label', 'Bỏ lưu việc làm');
                        
                        const jobData = JobData.getJobById(jobId);
                        if (jobData && !savedJobs.some(job => job.id === jobId)) {
                            savedJobs.push(jobData);
                            saveJobsToStorage();
                            showToast('Đã lưu việc làm thành công!', 'success');
                        }
                    } else if (icon) {
                        // Unsave job
                        icon.classList.remove('bi-bookmark-fill');
                        icon.classList.remove('text-warning');
                        icon.classList.add('bi-bookmark');
                        this.setAttribute('aria-label', 'Lưu việc làm');
                        
                        savedJobs = savedJobs.filter(job => job.id !== jobId);
                        saveJobsToStorage();
                        showToast('Đã bỏ lưu việc làm!', 'warning');
                    }
                });
            });

            // View job buttons
            document.querySelectorAll('.view-job-btn').forEach(btn => {
                // Loại bỏ sự kiện cũ nếu có
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                newBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const jobId = parseInt(this.dataset.jobId);
                    window.location.href = `job-detail.html?id=${jobId}`;
                });
            });
        }

        // ==================== FILTER FUNCTIONALITY ====================
        function attachFilterEvents() {
            const openFilterBtn = document.getElementById('openFilterSheet');
            const closeFilterBtn = document.getElementById('closeFilterSheet');
            const filterOverlay = document.getElementById('filterOverlay');
            const filterBottomSheet = document.getElementById('filterBottomSheet');
            
            const applyFiltersBtn = document.getElementById('applyFilters');
            const clearFiltersBtn = document.getElementById('clearFilters');
            const applyMobileFiltersBtn = document.getElementById('applyMobileFilters');
            const clearMobileFiltersBtn = document.getElementById('clearMobileFilters');
            
            const searchForm = document.getElementById('jobSearchForm');
            const sortInputs = document.querySelectorAll('input[name="sortOrder"]');

            // Open filter sheet
            if (openFilterBtn) {
                openFilterBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (filterBottomSheet) {
                        filterBottomSheet.style.display = 'block';
                        filterBottomSheet.offsetHeight;
                        filterBottomSheet.classList.add('active');
                    }
                    if (filterOverlay) {
                        filterOverlay.classList.add('active');
                    }
                    document.body.style.overflow = 'hidden';
                });
            }

            // Close filter sheet
            if (closeFilterBtn) {
                closeFilterBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeFilterSheet();
                });
            }

            if (filterOverlay) {
                filterOverlay.addEventListener('click', closeFilterSheet);
            }

            function closeFilterSheet() {
                const filterBottomSheet = document.getElementById('filterBottomSheet');
                const filterOverlay = document.getElementById('filterOverlay');
                
                if (filterBottomSheet) {
                    filterBottomSheet.classList.remove('active');
                    setTimeout(() => {
                        filterBottomSheet.style.display = 'none';
                    }, 300);
                }
                if (filterOverlay) {
                    filterOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }

            // Apply filters
            function applyFilters() {
                showToast('Đã áp dụng bộ lọc!', 'info');
                closeFilterSheet();
            }

            // Clear filters
            function clearFilters() {
                document.querySelectorAll('.filter-card input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                const desktopTextFilter = document.querySelector('.filter-card input[type="text"]');
                if (desktopTextFilter) {
                    desktopTextFilter.value = '';
                }
                
                document.querySelectorAll('.filter-sheet-content input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                const mobileTextFilter = document.getElementById('mobileKeywordFilter');
                if (mobileTextFilter) {
                    mobileTextFilter.value = '';
                }
                
                showToast('Đã xóa tất cả bộ lọc!', 'info');
            }

            if (applyFiltersBtn) {
                applyFiltersBtn.addEventListener('click', applyFilters);
            }
            if (clearFiltersBtn) {
                clearFiltersBtn.addEventListener('click', clearFilters);
            }
            if (applyMobileFiltersBtn) {
                applyMobileFiltersBtn.addEventListener('click', applyFilters);
            }
            if (clearMobileFiltersBtn) {
                clearMobileFiltersBtn.addEventListener('click', clearFilters);
            }

            // Search form
            if (searchForm) {
                searchForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const keywordInput = this.querySelector('input[type="text"]');
                    const keyword = keywordInput ? keywordInput.value : '';
                    searchJobs(keyword);
                });
            }

            // Sort functionality
            sortInputs.forEach(input => {
                input.addEventListener('change', function() {
                    sortJobs(this.value);
                });
            });

            function sortJobs(sortBy) {
                let jobs = JobData.getAllJobs();
                
                switch(sortBy) {
                    case 'salary':
                        jobs.sort((a, b) => {
                            const aSalaryNum = parseInt(a.salary.replace(/\D/g, '')) || 0;
                            const bSalaryNum = parseInt(b.salary.replace(/\D/g, '')) || 0;
                            return bSalaryNum - aSalaryNum;
                        });
                        break;
                    case 'urgent':
                        jobs = jobs.filter(job => job.badges && job.badges.includes('URGENT'));
                        break;
                    default: // newest
                        jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
                }
                
                renderJobs(jobs);
            }

            function searchJobs(keyword) {
                if (!keyword.trim()) {
                    renderJobs(JobData.getAllJobs());
                    return;
                }
                
                const filteredJobs = JobData.searchJobs(keyword);
                renderJobs(filteredJobs);
            }

            // Popular keywords
            document.querySelectorAll('.popular-keyword').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const keyword = this.textContent;
                    searchJobs(keyword);
                    
                    // Update search input
                    const searchInput = document.querySelector('#jobSearchForm input[type="text"]');
                    if (searchInput) {
                        searchInput.value = keyword;
                    }
                });
            });
        }

        // ==================== INIT JOBS PAGE ====================
        // Initial render
        renderJobs(JobData.getAllJobs());
        
        // Attach filter events
        attachFilterEvents();
    }

    // ==================== SAVED JOBS PAGE ====================
   // ==================== SAVED JOBS PAGE ====================
function initSavedJobsPage() {
    if (!document.querySelector('.saved-jobs-section')) return;

    const container = document.getElementById('savedJobsContainer');
    const emptyState = document.getElementById('emptyState');
    const countElement = document.getElementById('count');
    const searchInput = document.getElementById('searchInput');
    let jobIdToRemove = null;

    function displayJobs(jobs) {
        if (countElement) countElement.textContent = jobs.length;
        
        if (jobs.length === 0) {
            if (container) container.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (container) {
            const html = JobCardBuilder.buildJobList(jobs, 'saved');
            container.innerHTML = html;
            attachRemoveListeners();
            attachApplyButtons();
        }
    }

    function attachRemoveListeners() {
        document.querySelectorAll('.save-job-btn').forEach(btn => {
            // Loại bỏ sự kiện cũ nếu có
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const jobId = parseInt(this.dataset.jobId);
                showModal(jobId);
            });
        });
    }

    function attachApplyButtons() {
        document.querySelectorAll('.apply-job-btn').forEach(btn => {
            // Loại bỏ sự kiện cũ nếu có
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const jobId = parseInt(this.dataset.jobId);
                
                requireLogin(function() {
                    if (confirm('Bạn có chắc chắn muốn ứng tuyển cho công việc này?')) {
                        showToast('Bạn đã ứng tuyển thành công!', 'success');
                    }
                });
            });
        });
    }

    function showModal(jobId) {
        jobIdToRemove = jobId;
        if (typeof Modal !== 'undefined' && document.getElementById('confirmationModal')) {
            Modal.show('confirmationModal');
        } else {
            if (confirm("Bạn có chắc chắn muốn bỏ lưu việc làm này không?")) {
                removeJob(jobId);
            }
        }
    }

    function removeJob(jobId) {
        savedJobs = savedJobs.filter(job => job.id !== jobId);
        saveJobsToStorage();
        displayJobs(savedJobs);
        
        if (typeof Modal !== 'undefined' && document.getElementById('confirmationModal')) {
            Modal.hide('confirmationModal');
        }
        jobIdToRemove = null;
        showToast('Đã bỏ lưu việc làm!', 'info');
    }

    // Setup modal event listeners
    function setupModalListeners() {
        const confirmRemoveBtn = document.getElementById('confirmRemove');
        if (confirmRemoveBtn) {
            const newBtn = confirmRemoveBtn.cloneNode(true);
            confirmRemoveBtn.parentNode.replaceChild(newBtn, confirmRemoveBtn);
            
            newBtn.addEventListener('click', function() {
                if (jobIdToRemove !== null) {
                    removeJob(jobIdToRemove);
                }
            });
        }

        const cancelModalBtn = document.getElementById('cancelModal');
        if (cancelModalBtn) {
            const newBtn = cancelModalBtn.cloneNode(true);
            cancelModalBtn.parentNode.replaceChild(newBtn, cancelModalBtn);
            
            newBtn.addEventListener('click', function() {
                if (typeof Modal !== 'undefined' && document.getElementById('confirmationModal')) {
                    Modal.hide('confirmationModal');
                }
                jobIdToRemove = null;
            });
        }

        document.addEventListener('click', function(event) {
            const modal = document.getElementById('confirmationModal');
            if (modal && event.target === modal) {
                if (typeof Modal !== 'undefined') {
                    Modal.hide('confirmationModal');
                }
                jobIdToRemove = null;
            }
        });
    }

    // Function tìm kiếm jobs
    function searchJobs() {
        const term = searchInput ? searchInput.value.toLowerCase() : '';
        const results = savedJobs.filter(job =>
            job.title.toLowerCase().includes(term) ||
            job.company.toLowerCase().includes(term) ||
            job.category.toLowerCase().includes(term) ||
            job.location.toLowerCase().includes(term)
        );
        displayJobs(results);
    }

    // Setup event listeners cho tìm kiếm
    const searchForm = document.getElementById('savedJobsSearchForm');
    const searchButton = document.getElementById('searchButton');
    
    // Xử lý submit form tìm kiếm
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchJobs();
        });
    }
    
    // Xử lý tìm kiếm real-time khi nhập
    if (searchInput) {
        searchInput.addEventListener('input', searchJobs);
    }

    // Khởi tạo các components
    setupModalListeners();
    displayJobs(savedJobs);
}

    // ==================== HOME PAGE FUNCTIONS ====================
    function initHomePage() {
        if (!document.body.classList.contains('home-page')) return;

        const heroSearchForm = document.querySelector('.hero-search form');
        if (heroSearchForm) {
            heroSearchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const keywordInput = this.querySelector('input[type="text"]');
                const keyword = keywordInput ? keywordInput.value : '';
                
                if (keyword.trim()) {
                    window.location.href = `./pages/jobs.html?search=${encodeURIComponent(keyword)}`;
                }
            });
        }

        document.querySelectorAll('.popular-keyword').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const keyword = this.textContent;
                window.location.href = `./pages/jobs.html?search=${encodeURIComponent(keyword)}`;
            });
        });

        document.querySelectorAll('.job-category-card').forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.dataset.category;
                window.location.href = `./pages/jobs.html?category=${encodeURIComponent(category)}`;
            });
        });
        
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', function() {
                const passwordField = this.closest('.password-field').querySelector('input');
                const icon = this.querySelector('i');
                
                if (passwordField && icon) {
                    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                    icon.classList.toggle('bi-eye');
                    icon.classList.toggle('bi-eye-slash');
                }
            });
        });
    }

    // ==================== JOB DETAIL PAGE ====================
    function initJobDetailPage() {
        if (!document.body.classList.contains('job-detail-page')) return;
        
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');
        
        if (!jobId) {
            document.querySelector('.container').innerHTML = '<div class="alert alert-danger">Không tìm thấy thông tin công việc!</div>';
            return;
        }
        
        const job = JobData.getJobById(jobId);
        if (!job) {
            document.querySelector('.container').innerHTML = '<div class="alert alert-danger">Không tìm thấy thông tin công việc!</div>';
            return;
        }
        
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        const isSaved = savedJobs.some(savedJob => savedJob.id === job.id);
        
        JobDetailRenderer.renderJobDetail(job, isSaved);
        
        const breadcrumbItem = document.querySelector('.breadcrumb-item.active');
        if (breadcrumbItem) {
            breadcrumbItem.textContent = job.title;
        }
    }

    // ==================== INIT ====================
    document.addEventListener('DOMContentLoaded', function () {
        // Khởi tạo login panel trước
    if (typeof LoginPanel !== 'undefined' && LoginPanel.init) {
        LoginPanel.init(); // Đảm bảo dòng này được gọi
    }
        
        // Initialize Offcanvas nếu có
        if (typeof Offcanvas !== 'undefined' && Offcanvas.init) {
            Offcanvas.init();
        }

        // Initialize trang phù hợp
        if (document.body.classList.contains('jobs-page')) {
            initJobsPage();
        }

        if (document.querySelector('.saved-jobs-section')) {
            initSavedJobsPage();
        }
        
        if (document.body.classList.contains('home-page')) {
            initHomePage();
        }
        
        if (document.body.classList.contains('job-detail-page')) {
            initJobDetailPage();
        }
    });

})();
