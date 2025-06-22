// ポートフォリオフィルター機能（note.com風）- 実際のプロジェクト対応版
document.addEventListener('DOMContentLoaded', function() {
    console.log('ポートフォリオフィルター初期化開始');
    
    // note.com風フィルターボタンの初期化
    const filterButtons = document.querySelectorAll('.note-filter-btn');
    
    if (filterButtons.length === 0) {
        console.warn('フィルターボタンが見つかりません');
        return;
    }
    
    filterButtons.forEach(button => {        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // スクロール状態を保護（新しいScrollController使用）
            if (window.scrollController && window.scrollController.isScrollDisabled) {
                return;
            }
            
            // アクティブクラスの切り替え
            filterButtons.forEach(btn => btn.classList.remove('note-filter-btn--active'));
            this.classList.add('note-filter-btn--active');
            
            // フィルター実行
            const filterValue = this.getAttribute('data-filter');
            console.log('フィルター実行:', filterValue);
            filterPortfolioCards(filterValue);
        });
    });
    
    console.log('ポートフォリオフィルター初期化完了');
});

// note.com風ポートフォリオカードフィルター関数（実際のプロジェクト対応）
function filterPortfolioCards(category = 'all') {
    const portfolioCards = document.querySelectorAll('.note-portfolio-card');
    
    if (portfolioCards.length === 0) {
        console.warn('ポートフォリオカードが見つかりません');
        return;
    }
    
    console.log(`フィルター適用: ${category}, 対象カード数: ${portfolioCards.length}`);
    
    portfolioCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category');
        
        if (!cardCategories) {
            console.warn('カードにdata-category属性がありません:', card);
            return;
        }
        
        const categories = cardCategories.split(' ');
        
        if (category === 'all' || categories.includes(category)) {
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
            }, 300);
        }
    });
}

// 初期表示時にすべてのカードを表示
window.addEventListener('load', function() {
    filterPortfolioCards('all');
});
