// ポートフォリオフィルター機能（note.com風）
document.addEventListener('DOMContentLoaded', function() {
    // note.com風フィルターボタンの初期化
    const filterButtons = document.querySelectorAll('.note-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブクラスの切り替え
            filterButtons.forEach(btn => btn.classList.remove('note-filter-btn--active'));
            this.classList.add('note-filter-btn--active');
            
            // フィルター実行
            const filterValue = this.getAttribute('data-filter');
            filterPortfolioCards(filterValue);
        });
    });
});

// note.com風ポートフォリオカードフィルター関数
function filterPortfolioCards(category = 'all') {
    const portfolioCards = document.querySelectorAll('.note-portfolio-card');
    
    portfolioCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' ');
        
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
            // アニメーション効果
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            // フェードアウト後に非表示
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);        }
    });
}
