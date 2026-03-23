// jobData.js - Dữ liệu công việc tĩnh
const JobData = {
    // Danh sách công việc
    jobs: [
        {
            "id": 1,
            "title": "Nhân viên phục vụ bàn",
            "company": "Nhà hàng ABC Cần Thơ",
            "salary": "18.000 - 22.000 VNĐ/giờ",
            "location": "Ninh Kiều, Cần Thơ",
            "category": "Phục vụ",
            "logo": "https://placehold.co/60x60",
            "postedDate": "15/06/2024",
            "deadline": "30/06/2024",
            "daysLeft": 15,
            "badges": ["HOT", "Part-time"],
            "description": [
                "Phục vụ khách hàng tại bàn ăn",
                "Giới thiệu món ăn, hướng dẫn khách gọi món",
                "Thu tiền, in hóa đơn, thu hồi đĩa dơ",
                "Giữ vệ sinh khu vực phục vụ",
                "Hỗ trợ đồng nghiệp khi cần thiết"
            ],
            "requirements": [
                "Tốt nghiệp THPT trở lên",
                "Ngoại hình khá, thân thiện, nhiệt tình",
                "Có kinh nghiệm làm phục vụ là một lợi thế",
                "Siêng năng, chịu khó, trung thực",
                "Có thể làm xoay ca linh hoạt"
            ],
            "benefits": [
                "Lương theo giờ: 18k - 22k/giờ",
                "Được đào tạo kỹ năng phục vụ chuyên nghiệp",
                "Được thưởng theo hiệu suất công việc",
                "Môi trường làm việc năng động, vui vẻ",
                "Có cơ hội thăng tiến lên vị trí quản lý"
            ],
            "contactInfo": {
                "name": "Anh Minh - Quản lý nhà hàng",
                "phone": "0900 123 456",
                "email": "tuyendung@nhahangabc.vn",
                "address": "123 Đường 3/2, Ninh Kiều, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Không yêu cầu",
                "gender": "Không yêu cầu",
                "age": "Từ 18 - 35 tuổi",
                "shifts": "Sáng/Ca/Tối",
                "quantity": "3 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 2,
            "title": "Gia sư môn Toán lớp 9",
            "company": "Gia sư tại nhà",
            "salary": "25.000 VNĐ/buổi",
            "location": "Cái Răng, Cần Thơ",
            "category": "Gia sư",
            "logo": "https://placehold.co/60x60",
            "postedDate": "14/06/2024",
            "deadline": "25/06/2024",
            "daysLeft": 11,
            "badges": ["Part-time"],
            "description": [
                "Dạy kèm Toán lớp 9 cho học sinh yếu, mất gốc",
                "Soạn giáo án phù hợp với từng học sinh",
                "Theo dõi tiến độ học tập và báo cáo cho phụ huynh"
            ],
            "requirements": [
                "Sinh viên năm 2 trở lên các ngành khoa học tự nhiên",
                "Có kinh nghiệm dạy kèm là một lợi thế",
                "Kiên nhẫn, trách nhiệm cao trong công việc"
            ],
            "benefits": [
                "Thu nhập hấp dẫn: 25.000 VNĐ/buổi",
                "Làm việc linh hoạt theo thời gian của bạn",
                "Có cơ hội phát triển kỹ năng giảng dạy"
            ],
            "contactInfo": {
                "name": "Cô Lan - Phụ huynh",
                "phone": "0912 345 678",
                "email": "phuhuynh.lan@gmail.com",
                "address": "456 Đường Lê Lợi, Cái Răng, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Không yêu cầu",
                "gender": "Nữ",
                "age": "18 - 25 tuổi",
                "shifts": "Tối (18h-20h)",
                "quantity": "1 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 3,
            "title": "Nhân viên bán hàng thời vụ",
            "company": "Siêu thị XYZ",
            "salary": "20.000 - 25.000 VNĐ/giờ",
            "location": "Bình Thủy, Cần Thơ",
            "category": "Bán hàng",
            "logo": "https://placehold.co/60x60",
            "postedDate": "10/06/2024",
            "deadline": "20/06/2024",
            "daysLeft": 5,
            "badges": ["URGENT"],
            "description": [
                "Hỗ trợ khách hàng chọn lựa sản phẩm",
                "Sắp xếp hàng hóa trên kệ",
                "Tính tiền và thu ngân",
                "Giữ gìn vệ sinh khu vực bán hàng"
            ],
            "requirements": [
                "Nam/nữ từ 18-30 tuổi",
                "Ngoại hình dễ nhìn, thân thiện",
                "Có thể làm xoay ca linh hoạt",
                "Ưu tiên có kinh nghiệm bán hàng"
            ],
            "benefits": [
                "Lương cạnh tranh: 20k-25k/giờ",
                "Được đào tạo kỹ năng bán hàng",
                "Thưởng doanh số cuối tháng",
                "Môi trường làm việc chuyên nghiệp"
            ],
            "contactInfo": {
                "name": "Chị Hoa - Quản lý nhân sự",
                "phone": "0987 654 321",
                "email": "tuyendung@sieuthixyz.vn",
                "address": "789 Đường Trần Hưng Đạo, Bình Thủy, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Ưu tiên có kinh nghiệm",
                "gender": "Không yêu cầu",
                "age": "18 - 30 tuổi",
                "shifts": "Sáng/Chiều/Tối",
                "quantity": "5 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 4,
            "title": "Nhân viên thu ngân",
            "company": "Cửa hàng tiện lợi ABC",
            "salary": "22.000 VNĐ/giờ",
            "location": "Ninh Kiều, Cần Thơ",
            "category": "Bán hàng",
            "logo": "https://placehold.co/60x60",
            "postedDate": "12/06/2024",
            "deadline": "28/06/2024",
            "daysLeft": 13,
            "badges": ["Part-time"],
            "description": [
                "Tính tiền và thu ngân cho khách hàng",
                "Kiểm tra hàng hóa trước khi khách mua",
                "Báo cáo doanh thu cuối ca",
                "Giữ gìn vệ sinh khu vực thu ngân"
            ],
            "requirements": [
                "Nam/nữ từ 18-25 tuổi",
                "Nhanh nhẹn, cẩn thận, trung thực",
                "Biết sử dụng máy tính cơ bản",
                "Ưu tiên có kinh nghiệm thu ngân"
            ],
            "benefits": [
                "Lương ổn định: 22k/giờ",
                "Được cấp đồng phục",
                "Làm việc theo ca linh hoạt",
                "Có cơ hội thăng tiến lên quản lý"
            ],
            "contactInfo": {
                "name": "Anh Tuấn - Quản lý cửa hàng",
                "phone": "0934 567 890",
                "email": "tuyendung@cuahangabc.vn",
                "address": "321 Đường Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Ưu tiên có kinh nghiệm",
                "gender": "Không yêu cầu",
                "age": "18 - 25 tuổi",
                "shifts": "Sáng/Chiều/Tối",
                "quantity": "2 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 5,
            "title": "Nhân viên chăm sóc khách hàng",
            "company": "Công ty dịch vụ XYZ",
            "salary": "25.000 - 30.000 VNĐ/giờ",
            "location": "Cái Răng, Cần Thơ",
            "category": "Khách hàng",
            "logo": "https://placehold.co/60x60",
            "postedDate": "08/06/2024",
            "deadline": "22/06/2024",
            "daysLeft": 7,
            "badges": ["HOT"],
            "description": [
                "Trả lời thắc mắc của khách hàng qua điện thoại/email",
                "Hướng dẫn khách hàng sử dụng dịch vụ",
                "Ghi nhận và xử lý phản hồi của khách hàng",
                "Báo cáo tình hình hoạt động hàng ngày"
            ],
            "requirements": [
                "Nam/nữ từ 18-28 tuổi",
                "Giao tiếp tốt, giọng nói dễ nghe",
                "Thành thạo tin học văn phòng",
                "Kiên nhẫn, có trách nhiệm trong công việc"
            ],
            "benefits": [
                "Lương hấp dẫn: 25k-30k/giờ",
                "Được đào tạo kỹ năng giao tiếp",
                "Môi trường làm việc chuyên nghiệp",
                "Có cơ hội thăng tiến lên trưởng nhóm"
            ],
            "contactInfo": {
                "name": "Chị Mai - Trưởng phòng nhân sự",
                "phone": "0911 222 333",
                "email": "tuyendung@congtyxyz.vn",
                "address": "567 Đường Hòa Bình, Cái Răng, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Ưu tiên có kinh nghiệm",
                "gender": "Không yêu cầu",
                "age": "18 - 28 tuổi",
                "shifts": "Sáng/Chiều",
                "quantity": "3 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        }
    ],

    // Lấy tất cả công việc
    getAllJobs() {
        return this.jobs;
    },

    // Lấy công việc theo ID
    getJobById(id) {
        return this.jobs.find(job => job.id === parseInt(id)) || null;
    },

    // Tìm kiếm công việc
    searchJobs(keyword = '', filters = {}) {
        return this.jobs.filter(job => {
            // Tìm kiếm theo từ khóa
            const matchesKeyword = !keyword || 
                job.title.toLowerCase().includes(keyword.toLowerCase()) ||
                job.company.toLowerCase().includes(keyword.toLowerCase()) ||
                job.category.toLowerCase().includes(keyword.toLowerCase()) ||
                job.location.toLowerCase().includes(keyword.toLowerCase());
            
            // Lọc theo các tiêu chí
            const matchesCategory = !filters.category || job.category === filters.category;
            const matchesLocation = !filters.location || job.location.includes(filters.location);
            
            return matchesKeyword && matchesCategory && matchesLocation;
        });
    },

    // Lấy công việc theo danh mục
    getJobsByCategory(category) {
        return this.jobs.filter(job => job.category === category);
    },

    // Lấy công việc mới nhất
    getLatestJobs(limit = 5) {
        return [...this.jobs]
            .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
            .slice(0, limit);
    },

    // Lấy công việc hot
    getHotJobs() {
        return this.jobs.filter(job => job.badges.includes('HOT'));
    }
};
