/*===== 画像最適化ライブラリ =====*/

/**
 * 画像最適化クラス
 * WebP対応、遅延読み込み、レスポンシブ画像を管理
 */
class ImageOptimizer {
    
    constructor() {
        this.webpSupported = this.checkWebPSupport();
        this.lazyImages = [];
        this.observer = null;
        this.init();
    }
    
    /**
     * 初期化
     */
    init() {
        this.setupLazyLoading();
        this.optimizeExistingImages();
        this.preloadCriticalImages();
    }
    
    /**
     * WebP対応チェック
     */
    checkWebPSupport() {
        return new Promise((resolve) => {
            const webp = new Image();
            webp.onload = webp.onerror = () => {
                resolve(webp.height === 2);
            };
            webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    /**
     * 遅延読み込みのセットアップ
     */
    setupLazyLoading() {
        // Intersection Observer API を使用
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '50px', // 50px手前で読み込み開始
                threshold: 0.1
            });
            
            // data-lazy属性を持つ画像を監視対象に追加
            this.lazyImages = document.querySelectorAll('img[data-lazy]');
            this.lazyImages.forEach(img => {
                this.observer.observe(img);
            });
        } else {
            // Intersection Observer 非対応の場合はスクロールイベントで代替
            this.fallbackLazyLoading();
        }
    }
    
    /**
     * 画像の実際の読み込み
     */
    async loadImage(img) {
        const webpSupported = await this.webpSupported;
        const originalSrc = img.dataset.lazy;
        const webpSrc = img.dataset.lazyWebp;
        
        // WebP対応の場合はWebP画像を優先
        const srcToLoad = webpSupported && webpSrc ? webpSrc : originalSrc;
        
        // プリローダーの表示
        img.style.filter = 'blur(5px)';
        img.style.transition = 'filter 0.3s ease';
        
        // 新しい画像オブジェクトで先読み
        const imageLoader = new Image();
        imageLoader.onload = () => {
            img.src = srcToLoad;
            img.style.filter = 'none';
            img.classList.add('loaded');
            
            // パフォーマンス測定
            this.measureImageLoadTime(img, performance.now());
        };
        
        imageLoader.onerror = () => {
            // エラー時は元の画像を表示
            img.src = originalSrc;
            img.style.filter = 'none';
            console.warn('Failed to load optimized image:', srcToLoad);
        };
        
        const loadStartTime = performance.now();
        imageLoader.src = srcToLoad;
        
        // srcset対応
        if (img.dataset.lazySrcset) {
            img.srcset = img.dataset.lazySrcset;
        }
    }
    
    /**
     * 既存画像の最適化
     */
    async optimizeExistingImages() {
        const allImages = document.querySelectorAll('img:not([data-lazy])');
        const webpSupported = await this.webpSupported;
        
        allImages.forEach(img => {
            // 適切なalt属性の確認
            if (!img.alt && !img.getAttribute('aria-label')) {
                console.warn('Image without alt text found:', img.src);
            }
            
            // loading="lazy"属性の追加（ブラウザネイティブ対応）
            if (!img.dataset.lazy && 'loading' in HTMLImageElement.prototype) {
                img.loading = 'lazy';
            }
            
            // decoding="async"属性の追加
            img.decoding = 'async';
        });
    }
    
    /**
     * 重要な画像のプリロード
     */
    preloadCriticalImages() {
        const criticalImages = [
            'assets/images/hero-bg.jpg',
            'assets/images/profile.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    /**
     * Intersection Observer 非対応時の代替処理
     */
    fallbackLazyLoading() {
        let lazyImageTimeout;
        
        const lazyLoad = () => {
            if (lazyImageTimeout) {
                clearTimeout(lazyImageTimeout);
            }
            
            lazyImageTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                this.lazyImages.forEach(img => {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        this.loadImage(img);
                        img.classList.remove('lazy');
                    }
                });
                
                if (this.lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationchange', lazyLoad);
                }
            }, 20);
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
    
    /**
     * 画像読み込み時間の測定
     */
    measureImageLoadTime(img, startTime) {
        const loadTime = performance.now() - startTime;
        
        // Performance API にマーク
        if ('performance' in window && performance.mark) {
            performance.mark(`image-loaded-${img.src.split('/').pop()}`);
        }
        
        // 開発環境でのログ出力
        if (window.location.hostname === 'localhost') {
            console.log(`Image loaded in ${loadTime.toFixed(2)}ms:`, img.src);
        }
    }
    
    /**
     * レスポンシブ画像のsrcset生成
     */
    static generateSrcSet(basePath, sizes = [320, 640, 960, 1280]) {
        return sizes.map(size => {
            const extension = basePath.split('.').pop();
            const path = basePath.replace(`.${extension}`, `_${size}w.${extension}`);
            return `${path} ${size}w`;
        }).join(', ');
    }
    
    /**
     * WebP画像パスの生成
     */
    static generateWebPPath(originalPath) {
        const extension = originalPath.split('.').pop();
        return originalPath.replace(`.${extension}`, '.webp');
    }
}

// 画像最適化の自動初期化
document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
});

// エクスポート
window.ImageOptimizer = ImageOptimizer;
