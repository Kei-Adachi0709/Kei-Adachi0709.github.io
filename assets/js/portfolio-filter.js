// ポートフォリオフィルター機能
document.addEventListener('DOMContentLoaded', function() {
    // フィルターボタンの初期化
    const filterButtons = document.querySelectorAll('.portfolio__filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブクラスの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // フィルター実行
            const filterValue = this.getAttribute('data-filter');
            filterPortfolio(filterValue);
        });
    });
});

// Swiperの初期化（ポートフォリオデータ読み込み後）
function initPortfolioSwiper() {
    window.portfolioSwiper = new Swiper('.portfolio__container', {
        loop: true,
        spaceBetween: 24,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

// ページ読み込み時にSwiper初期化を遅延実行
document.addEventListener('DOMContentLoaded', function() {
    // Swiperライブラリが読み込まれるまで待機
    function waitForSwiper() {
        if (typeof Swiper !== 'undefined') {
            // ポートフォリオデータの読み込みを待つ
            setTimeout(() => {
                initPortfolioSwiper();
            }, 500);
        } else {
            setTimeout(waitForSwiper, 100);
        }
    }
    
    waitForSwiper();
});
