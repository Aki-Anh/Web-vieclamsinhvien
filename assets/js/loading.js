// assets/js/loading.js
$(document).ready(function() {
  
  // Hiển thị loading screen
  function showLoading() {
    $('#loadingScreen').addClass('show');
  }
  
  // Ẩn loading screen
  function hideLoading() {
    $('#loadingScreen').removeClass('show');
  }
  
  // Tự động ẩn loading screen sau khi trang tải xong
  $(window).on('load', function() {
    setTimeout(function() {
      hideLoading();
    }, 500);
  });
  
  // Fallback: Ẩn loading sau 5 giây nếu chưa ẩn
  setTimeout(function() {
    hideLoading();
  }, 5000);
  
  // Hiển thị loading khi click vào các liên kết hoặc form submit
  $(document).on('click', 'a[href]:not([target]):not([href^="mailto:"]):not([href^="tel:"]):not(.no-loading)', function(e) {
    // Kiểm tra nếu là liên kết nội bộ và không phải là anchor link
    if (this.hostname === location.hostname && !$(this).attr('href').startsWith('#')) {
      showLoading();
      
      // Timeout để tránh loading mãi nếu có lỗi
      setTimeout(function() {
        hideLoading();
      }, 10000);
    }
  });
  
  // Hiển thị loading khi submit form
  $(document).on('submit', 'form:not(.no-loading)', function() {
    showLoading();
    
    // Timeout để tránh loading mãi nếu có lỗi
    setTimeout(function() {
      hideLoading();
    }, 10000);
  });
  
  // AJAX loading
  $(document).ajaxStart(function() {
    showLoading();
  }).ajaxStop(function() {
    setTimeout(function() {
      hideLoading();
    }, 500);
  }).ajaxError(function() {
    // Ẩn loading nếu có lỗi AJAX
    setTimeout(function() {
      hideLoading();
    }, 500);
  });
  
  // Xử lý nút back/forward browser
  $(window).on('pageshow', function(event) {
    if (event.originalEvent.persisted) {
      // Trang được load từ cache, ẩn loading
      setTimeout(function() {
        hideLoading();
      }, 100);
    }
  });
  
  // Xử lý khi người dùng nhấn back button
  $(window).on('beforeunload', function() {
    // Có thể show loading khi unload nếu cần
  });
});

// Functions để sử dụng thủ công
function showPageLoading() {
  $('#loadingScreen').addClass('show');
}

function hidePageLoading() {
  $('#loadingScreen').removeClass('show');
}