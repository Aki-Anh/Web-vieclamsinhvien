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
  
  // Hiển thị loading khi click vào các liên kết hoặc form submit
  $('a[href]:not([target]):not([href^="mailto:"]):not([href^="tel:"])').on('click', function() {
    showLoading();
  });
  
  // Hiển thị loading khi submit form
  $('form').on('submit', function() {
    showLoading();
  });
  
  // AJAX loading
  $(document).ajaxStart(function() {
    showLoading();
  }).ajaxStop(function() {
    setTimeout(function() {
      hideLoading();
    }, 500);
  });
});

// Functions để sử dụng thủ công
function showPageLoading() {
  $('#loadingScreen').addClass('show');
}

function hidePageLoading() {
  $('#loadingScreen').removeClass('show');
}

