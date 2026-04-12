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
            "logo": "../../assets/images/placeholders/company-logo.svg",
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
            "mapEmbed": "../../assets/images/placeholders/map-placeholder.svg",
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
                "Nam/nú từ 18-28 tuổi",
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
        },
        // Thêm dữ liệu mới để test phân trang
        {
            "id": 6,
            "title": "Nhân viên marketing part-time",
            "company": "Công ty truyền thông MNP",
            "salary": "15.000 - 20.000 VNĐ/giờ",
            "location": "Ninh Kiều, Cần Thơ",
            "category": "Marketing",
            "logo": "https://placehold.co/60x60",
            "postedDate": "05/06/2024",
            "deadline": "20/06/2024",
            "daysLeft": 10,
            "badges": ["Part-time"],
            "description": [
                "Hỗ trợ chạy quảng cáo trên mạng xã hội",
                "Thiết kế nội dung cho fanpage",
                "Theo dõi và báo cáo hiệu quả chiến dịch"
            ],
            "requirements": [
                "Sinh viên năm 2 trở lên",
                "Biết sử dụng Facebook, Instagram",
                "Có tư duy sáng tạo là lợi thế"
            ],
            "benefits": [
                "Lương theo giờ: 15k - 20k/giờ",
                "Được đào tạo kỹ năng marketing",
                "Làm việc linh hoạt theo thời gian",
                "Có thể chuyển sang full-time sau 3 tháng"
            ],
            "contactInfo": {
                "name": "Anh Phúc - Trưởng phòng Marketing",
                "phone": "0933 444 555",
                "email": "tuyendung@congtymnp.vn",
                "address": "12 Đường 3/2, Ninh Kiều, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Không yêu cầu",
                "gender": "Không yêu cầu",
                "age": "18 - 25 tuổi",
                "shifts": "Chiều/Tối",
                "quantity": "2 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 7,
            "title": "Gia sư tiếng Anh lớp 6-8",
            "company": "Trung tâm gia sư EDC",
            "salary": "30.000 VNĐ/buổi",
            "location": "Cái Răng, Cần Thơ",
            "category": "Gia sư",
            "logo": "https://placehold.co/60x60",
            "postedDate": "03/06/2024",
            "deadline": "18/06/2024",
            "daysLeft": 8,
            "badges": ["Part-time"],
            "description": [
                "Dạy kèm tiếng Anh cho học sinh lớp 6-8",
                "Soạn bài giảng theo giáo trình Cambridge",
                "Đánh giá tiến độ học tập hàng tháng"
            ],
            "requirements": [
                "Sinh viên chuyên ngành tiếng Anh năm 3+",
                "Có chứng chỉ IELTS 6.5 trở lên",
                "Có kinh nghiệm dạy kèm tiếng Anh"
            ],
            "benefits": [
                "Thu nhập cao: 30.000 VNĐ/buổi",
                "Được cung cấp tài liệu giảng dạy",
                "Làm việc theo lịch linh hoạt",
                "Có thưởng cuối năm nếu hiệu quả"
            ],
            "contactInfo": {
                "name": "Cô Dung - Giám đốc trung tâm",
                "phone": "0912 333 444",
                "email": "giaosu@trungtam-edc.edu.vn",
                "address": "45 Đường Lê Lợi, Cái Răng, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Có kinh nghiệm",
                "gender": "Không yêu cầu",
                "age": "19 - 25 tuổi",
                "shifts": "Chiều (15h-17h)",
                "quantity": "3 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 8,
            "title": "Nhân viên lễ tân khách sạn",
            "company": "Khách sạn Luxury CT",
            "salary": "25.000 VNĐ/giờ",
            "location": "Ninh Kiều, Cần Thơ",
            "category": "Khách sạn",
            "logo": "https://placehold.co/60x60",
            "postedDate": "01/06/2024",
            "deadline": "15/06/2024",
            "daysLeft": 5,
            "badges": ["URGENT"],
            "description": [
                "Đón tiếp khách, check-in/check-out",
                "Trả lời điện thoại, hỗ trợ khách hàng",
                "Quản lý phòng và lịch làm việc",
                "Giữ gìn vệ sinh khu vực lễ tân"
            ],
            "requirements": [
                "Ngoại hình khá, giọng nói chuẩn",
                "Biết tiếng Anh cơ bản",
                "Có kinh nghiệm làm lễ tân là lợi thế",
                "Làm việc theo ca linh hoạt"
            ],
            "benefits": [
                "Lương ổn định: 25k/giờ",
                "Được đào tạo kỹ năng chuyên nghiệp",
                "Thưởng theo doanh thu tháng",
                "Đồng phục miễn phí"
            ],
            "contactInfo": {
                "name": "Chị Lan - Quản lý nhân sự",
                "phone": "0988 777 666",
                "email": "hr@luxuryhotel.vn",
                "address": "234 Đường Trần Hưng Đạo, Ninh Kiều, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Ưu tiên có kinh nghiệm",
                "gender": "Nữ",
                "age": "18 - 30 tuổi",
                "shifts": "Sáng/Chiều/Tối",
                "quantity": "4 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 9,
            "title": "Nhân viên giao hàng bán thời gian",
            "company": "ShipperNow Cần Thơ",
            "salary": "18.000 VNĐ/ca + thưởng",
            "location": "Toàn TP Cần Thơ",
            "category": "Giao hàng",
            "logo": "https://placehold.co/60x60",
            "postedDate": "30/05/2024",
            "deadline": "15/06/2024",
            "daysLeft": 3,
            "badges": ["HOT", "Part-time"],
            "description": [
                "Giao hàng tận nơi cho khách hàng",
                "Nhận đơn từ ứng dụng di động",
                "Thu tiền mặt và đối soát cuối ca",
                "Báo cáo tình trạng giao hàng"
            ],
            "requirements": [
                "Tốt nghiệp THPT trở lên",
                "Có phương tiện di chuyển (xe máy)",
                "Ngoại hình khá, thân thiện",
                "Làm việc theo ca linh hoạt"
            ],
            "benefits": [
                "Thu nhập từ 18k/ca + thưởng theo đơn",
                "Làm việc linh hoạt theo thời gian",
                "Được cấp áo đồng phục chuyên nghiệp",
                "Có cơ hội thăng tiến lên đội trưởng"
            ],
            "contactInfo": {
                "name": "Anh Đức - Quản lý khu vực",
                "phone": "0900 555 666",
                "email": "tuyendung@shippernow.vn",
                "address": "56 Đường Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Không yêu cầu",
                "gender": "Nam",
                "age": "18 - 35 tuổi",
                "shifts": "Sáng/Chiều/Tối",
                "quantity": "10 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 10,
            "title": "Nhân viên thiết kế đồ họa part-time",
            "company": "Studio Creative Art",
            "salary": "30.000 - 50.000 VNĐ/giờ",
            "location": "Bình Thủy, Cần Thơ",
            "category": "Thiết kế",
            "logo": "https://placehold.co/60x60",
            "postedDate": "28/05/2024",
            "deadline": "12/06/2024",
            "daysLeft": 1,
            "badges": ["Part-time"],
            "description": [
                "Thiết kế poster, banner cho sự kiện",
                "Chỉnh sửa ảnh sản phẩm thương mại điện tử",
                "Tạo nội dung social media cho brand",
                "Hỗ trợ team marketing với các assets cần thiết"
            ],
            "requirements": [
                "Sinh viên năm 3+ chuyên ngành thiết kế",
                "Thành thạo Photoshop, Illustrator, Canva",
                "Có portfolio là lợi thế",
                "Sáng tạo, có eye cho design"
            ],
            "benefits": [
                "Lương hấp dẫn: 30k-50k/giờ theo năng lực",
                "Được làm việc với các dự án thực tế",
                "Portfolio chất lượng sau mỗi dự án",
                "Linh hoạt thời gian làm việc"
            ],
            "contactInfo": {
                "name": "Anh Minh - Founder Studio",
                "phone": "0933 888 999",
                "email": "minh@creativeart.studio",
                "address": "78 Đường Hòa Bình, Bình Thủy, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Có kinh nghiệm",
                "gender": "Không yêu cầu",
                "age": "19 - 26 tuổi",
                "shifts": "Linh hoạt",
                "quantity": "2 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 11,
            "title": "Nhân viên content creator TikTok",
            "company": "Brand Fashion XYZ",
            "salary": "200.000 - 500.000 VNĐ/tháng",
            "location": "Ninh Kiều, Cần Thơ",
            "category": "Marketing",
            "logo": "https://placehold.co/60x60",
            "postedDate": "25/05/2024",
            "deadline": "10/06/2024",
            "daysLeft": 2,
            "badges": ["HOT"],
            "description": [
                "Sáng tạo nội dung video ngắn cho TikTok",
                "Lên ý tưởng kịch bản phù hợp xu hướng",
                "Tương tác với cộng đồng followers",
                "Phối hợp với team marketing để lên plan"
            ],
            "requirements": [
                "Sinh viên năm 2+ bất kỳ chuyên ngành",
                "Có tài khoản TikTok cá nhân (1K+ followers)",
                "Hiểu biết về trend, xu hướng mạng xã hội",
                "Tự tin trước camera, giọng nói rõ ràng"
            ],
            "benefits": [
                "Thu nhập hấp dẫn: 200k-500k/tháng + thưởng",
                "Được training về content creation",
                "Build personal brand cùng brand lớn",
                "Cơ hội full-time nếu đạt KPI"
            ],
            "contactInfo": {
                "name": "Chị Trang - Marketing Manager",
                "phone": "0911 999 888",
                "email": "tuyendung@brandfashion.xyz",
                "address": "321 Đường 3/2, Ninh Kiều, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Không yêu cầu",
                "gender": "Không yêu cầu",
                "age": "18 - 25 tuổi",
                "shifts": "Linh hoạt",
                "quantity": "3 người"
            },
            "mapEmbed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.892345780755!2d105.765432!3d10.029934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDAxJzQ3LjgiTiAxMDVCsDQ1JzU1LjYiRQ!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        },
        {
            "id": 12,
            "title": "Nhân viên tổ chức sự kiện part-time",
            "company": "Event Planner Pro",
            "salary": "25.000 VNĐ/giờ",
            "location": "Toàn TP Cần Thơ",
            "category": "Sự kiện",
            "logo": "https://placehold.co/60x60",
            "postedDate": "22/05/2024",
            "deadline": "05/06/2024",
            "daysLeft": 4,
            "badges": ["Part-time"],
            "description": [
                "Hỗ trợ setup/backdrop cho sự kiện",
                "Check-in khách mời, hướng dẫn chỗ ngồi",
                "Quản lý timeline sự kiện theo hướng dẫn",
                "Hỗ trợ tổng kết sau sự kiện"
            ],
            "requirements": [
                "Sinh viên năm 2+, ngoại hình khá",
                "Có tinh thần trách nhiệm cao",
                "Sẵn sàng làm việc cuối tuần/ngày lễ",
                "Ưu tiên có kinh nghiệm tổ chức sự kiện"
            ],
            "benefits": [
                "Lương ổn định: 25k/giờ",
                "Được tham gia nhiều sự kiện lớn",
                "Networking với các brand lớn",
                "Có cơ hội chuyển sang full-time"
            ],
            "contactInfo": {
                "name": "Anh Quốc - Event Director",
                "phone": "0934 111 222",
                "email": "tuyendung@eventpro.vn",
                "address": "156 Đường Lê Lợi, Cái Răng, Cần Thơ"
            },
            "recruitmentInfo": {
                "experience": "Ưu tiên có kinh nghiệm",
                "gender": "Không yêu cầu",
                "age": "19 - 28 tuổi",
                "shifts": "Cuối tuần/Lễ",
                "quantity": "8 người"
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