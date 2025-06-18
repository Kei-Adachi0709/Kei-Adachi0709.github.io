/*===== パフォーマンス測定・監視ライブラリ =====*/

/**
 * ウェブパフォーマンス測定クラス
 * Core Web Vitals、読み込み時間、リソース使用量を監視
 */
class PerformanceMonitor {
    
    constructor() {
        this.metrics = {};
        this.observers = [];
        this.startTime = performance.now();
        this.init();
    }
    
    /**
     * 初期化
     */
    init() {
        this.measureCoreWebVitals();
        this.measureLoadingTimes();
        this.measureResourceUsage();
        this.setupContinuousMonitoring();
    }
    
    /**
     * Core Web Vitals 測定
     */
    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                this.metrics.lcp = {
                    value: lastEntry.renderTime || lastEntry.loadTime,
                    rating: this.getLCPRating(lastEntry.renderTime || lastEntry.loadTime),
                    element: lastEntry.element?.tagName || 'unknown'
                };
                
                console.log('📊 LCP (Largest Contentful Paint):', this.metrics.lcp);
            });
            
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(lcpObserver);
        }
        
        // First Input Delay (FID)
        if ('PerformanceObserver' in window) {
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = {
                        value: entry.processingStart - entry.startTime,
                        rating: this.getFIDRating(entry.processingStart - entry.startTime),
                        eventType: entry.name
                    };
                    
                    console.log('📊 FID (First Input Delay):', this.metrics.fid);
                });
            });
            
            fidObserver.observe({ entryTypes: ['first-input'] });
            this.observers.push(fidObserver);
        }
        
        // Cumulative Layout Shift (CLS)
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            let clsEntries = [];
            
            const clsObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        clsEntries.push(entry);
                    }
                });
                
                this.metrics.cls = {
                    value: clsValue,
                    rating: this.getCLSRating(clsValue),
                    entries: clsEntries.length
                };
                
                console.log('📊 CLS (Cumulative Layout Shift):', this.metrics.cls);
            });
            
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        }
    }
    
    /**
     * 読み込み時間測定
     */
    measureLoadingTimes() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            
            this.metrics.loading = {
                // DNS lookup time
                dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
                
                // TCP connection time
                tcpConnection: navigation.connectEnd - navigation.connectStart,
                
                // Server response time (TTFB)
                ttfb: navigation.responseStart - navigation.requestStart,
                
                // DOM content loaded
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
                
                // Complete page load
                pageLoad: navigation.loadEventEnd - navigation.navigationStart,
                
                // First Paint
                firstPaint: this.getFirstPaint(),
                
                // First Contentful Paint
                firstContentfulPaint: this.getFirstContentfulPaint()
            };
            
            console.log('📊 Loading Times:', this.metrics.loading);
            this.evaluatePerformance();
        });
    }
    
    /**
     * リソース使用量測定
     */
    measureResourceUsage() {
        // メモリ使用量（Chrome系ブラウザのみ）
        if ('memory' in performance) {
            this.metrics.memory = {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            };
        }
        
        // リソース読み込み詳細
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            
            this.metrics.resources = {
                total: resources.length,
                images: resources.filter(r => r.initiatorType === 'img').length,
                scripts: resources.filter(r => r.initiatorType === 'script').length,
                stylesheets: resources.filter(r => r.initiatorType === 'link').length,
                totalSize: this.calculateTotalResourceSize(resources),
                slowestResource: this.findSlowestResource(resources)
            };
            
            console.log('📊 Resource Usage:', this.metrics.resources);
        });
    }
    
    /**
     * 継続的監視のセットアップ
     */
    setupContinuousMonitoring() {
        // 5秒間隔でパフォーマンス状況をチェック
        setInterval(() => {
            this.checkPerformanceHealth();
        }, 5000);
        
        // ページ離脱時にレポート送信
        window.addEventListener('beforeunload', () => {
            this.sendPerformanceReport();
        });
        
        // Visibility API でページのアクティブ状態監視
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.metrics.timeOnPage = performance.now() - this.startTime;
            }
        });
    }
    
    /**
     * First Paint 取得
     */
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? firstPaint.startTime : null;
    }
    
    /**
     * First Contentful Paint 取得
     */
    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? fcp.startTime : null;
    }
    
    /**
     * 総リソースサイズ計算
     */
    calculateTotalResourceSize(resources) {
        return resources.reduce((total, resource) => {
            return total + (resource.transferSize || 0);
        }, 0);
    }
    
    /**
     * 最も遅いリソース特定
     */
    findSlowestResource(resources) {
        return resources.reduce((slowest, resource) => {
            const duration = resource.responseEnd - resource.requestStart;
            const slowestDuration = slowest.responseEnd - slowest.requestStart;
            return duration > slowestDuration ? resource : slowest;
        }, resources[0]);
    }
    
    /**
     * LCP評価
     */
    getLCPRating(value) {
        if (value <= 2500) return 'good';
        if (value <= 4000) return 'needs-improvement';
        return 'poor';
    }
    
    /**
     * FID評価
     */
    getFIDRating(value) {
        if (value <= 100) return 'good';
        if (value <= 300) return 'needs-improvement';
        return 'poor';
    }
    
    /**
     * CLS評価
     */
    getCLSRating(value) {
        if (value <= 0.1) return 'good';
        if (value <= 0.25) return 'needs-improvement';
        return 'poor';
    }
    
    /**
     * パフォーマンス総合評価
     */
    evaluatePerformance() {
        const scores = {
            lcp: this.metrics.lcp?.rating || 'unknown',
            fid: this.metrics.fid?.rating || 'unknown',
            cls: this.metrics.cls?.rating || 'unknown',
            ttfb: this.metrics.loading?.ttfb <= 600 ? 'good' : 'poor',
            pageLoad: this.metrics.loading?.pageLoad <= 3000 ? 'good' : 'poor'
        };
        
        const goodScores = Object.values(scores).filter(score => score === 'good').length;
        const totalScores = Object.values(scores).filter(score => score !== 'unknown').length;
        
        this.metrics.overallScore = Math.round((goodScores / totalScores) * 100);
        
        console.log('🏆 Overall Performance Score:', this.metrics.overallScore);
        console.log('📈 Detailed Scores:', scores);
        
        // パフォーマンススコアの表示
        this.displayPerformanceScore();
    }
    
    /**
     * パフォーマンススコア表示
     */
    displayPerformanceScore() {
        // 開発環境でのみ表示
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const scoreElement = document.createElement('div');
            scoreElement.innerHTML = `
                <div style="
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    background: ${this.metrics.overallScore >= 90 ? '#22c55e' : 
                                 this.metrics.overallScore >= 70 ? '#f59e0b' : '#ef4444'};
                    color: white;
                    padding: 10px;
                    border-radius: 8px;
                    font-family: monospace;
                    font-size: 12px;
                    z-index: 10000;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                ">
                    Performance: ${this.metrics.overallScore}%<br>
                    LCP: ${this.metrics.lcp?.value?.toFixed(0)}ms<br>
                    CLS: ${this.metrics.cls?.value?.toFixed(3)}<br>
                    TTFB: ${this.metrics.loading?.ttfb?.toFixed(0)}ms
                </div>
            `;
            document.body.appendChild(scoreElement);
        }
    }
    
    /**
     * パフォーマンス健全性チェック
     */
    checkPerformanceHealth() {
        // メモリリーク検出
        if ('memory' in performance) {
            const currentMemory = performance.memory.usedJSHeapSize;
            const initialMemory = this.metrics.memory?.usedJSHeapSize || currentMemory;
            
            if (currentMemory > initialMemory * 2) {
                console.warn('⚠️ Potential memory leak detected');
                AdvancedXSSProtection?.logSecurityEvent('MEMORY_LEAK_WARNING', {
                    currentMemory,
                    initialMemory,
                    ratio: currentMemory / initialMemory
                });
            }
        }
        
        // 長時間実行タスクの検出
        const longTasks = performance.getEntriesByType('longtask');
        if (longTasks.length > 0) {
            console.warn('⚠️ Long tasks detected:', longTasks.length);
        }
    }
    
    /**
     * パフォーマンスレポート送信
     */
    sendPerformanceReport() {
        // 本番環境では分析サービスに送信
        if (window.location.hostname !== 'localhost') {
            // Google Analytics 4 にカスタムイベント送信
            if (typeof gtag !== 'undefined') {
                gtag('event', 'performance_metrics', {
                    lcp: this.metrics.lcp?.value,
                    fid: this.metrics.fid?.value,
                    cls: this.metrics.cls?.value,
                    overall_score: this.metrics.overallScore
                });
            }
        }
        
        // 開発環境では詳細ログ出力
        console.log('📊 Final Performance Report:', this.metrics);
    }
    
    /**
     * パフォーマンス改善提案
     */
    getOptimizationSuggestions() {
        const suggestions = [];
        
        if (this.metrics.lcp?.rating === 'poor') {
            suggestions.push('LCP改善: 画像最適化、クリティカルCSS、CDN使用を検討');
        }
        
        if (this.metrics.fid?.rating === 'poor') {
            suggestions.push('FID改善: JavaScript実行時間短縮、コード分割を検討');
        }
        
        if (this.metrics.cls?.rating === 'poor') {
            suggestions.push('CLS改善: 画像・動画のサイズ指定、フォント最適化を検討');
        }
        
        if (this.metrics.loading?.ttfb > 600) {
            suggestions.push('TTFB改善: サーバー応答時間短縮、CDN使用を検討');
        }
        
        return suggestions;
    }
}

// パフォーマンス監視の自動開始
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
});

// エクスポート
window.PerformanceMonitor = PerformanceMonitor;
