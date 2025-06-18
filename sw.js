/**
 * Service Worker - パフォーマンス最適化とオフライン対応
 * @description PWA機能とキャッシュ戦略による高速化を実現
 * @author 足立慧 (Kei Adachi)
 * @version 1.0.0
 */

const CACHE_NAME = 'kei-adachi-portfolio-v1.0.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const IMAGE_CACHE = 'images-v1';

// キャッシュするリソース（プリキャッシュ）
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/css/critical.css',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/js/image-optimization.js',
    '/assets/js/performance.js',
    '/assets/js/analytics.js',
    '/assets/fonts/NotoSansJP-Regular.woff2',
    '/assets/images/profile.webp',
    '/assets/images/hero-bg.webp',
    '/assets/images/favicon.ico',
    '/assets/images/apple-touch-icon.png',
    '/robots.txt',
    '/sitemap.xml'
];

// 動的キャッシュ対象パターン
const DYNAMIC_CACHE_PATTERNS = [
    /^https:\/\/fonts\.googleapis\.com/,
    /^https:\/\/fonts\.gstatic\.com/,
    /^https:\/\/unpkg\.com/,
    /^https:\/\/cdn\.jsdelivr\.net/
];

// 画像キャッシュ対象パターン
const IMAGE_CACHE_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i
];

// キャッシュ最大期間設定
const CACHE_STRATEGIES = {
    static: 30 * 24 * 60 * 60 * 1000, // 30日
    dynamic: 7 * 24 * 60 * 60 * 1000, // 7日
    images: 14 * 24 * 60 * 60 * 1000  // 14日
};

/**
 * Service Worker インストール
 */
self.addEventListener('install', event => {
    console.log('[SW] Installing Service Worker...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[SW] Precaching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[SW] Failed to cache static assets:', error);
            })
    );
});

/**
 * Service Worker アクティベート
 */
self.addEventListener('activate', event => {
    console.log('[SW] Activating Service Worker...');
    
    event.waitUntil(
        Promise.all([
            // 古いキャッシュの削除
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== IMAGE_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // 新しいService Workerをすぐに制御開始
            self.clients.claim()
        ])
            .then(() => {
                console.log('[SW] Service Worker activated successfully');
            })
            .catch(error => {
                console.error('[SW] Failed to activate:', error);
            })
    );
});

/**
 * フェッチイベント - キャッシュ戦略の実装
 */
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // POSTリクエストなどはキャッシュしない
    if (request.method !== 'GET') {
        return;
    }
    
    // Chrome拡張機能のリクエストを除外
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    event.respondWith(handleFetch(request));
});

/**
 * フェッチハンドリングのメイン関数
 */
async function handleFetch(request) {
    const url = new URL(request.url);
    
    try {
        // 1. 静的アセット（Cache First戦略）
        if (isStaticAsset(url)) {
            return await cacheFirst(request, STATIC_CACHE);
        }
        
        // 2. 画像ファイル（Cache First戦略 + WebP最適化）
        if (isImageRequest(url)) {
            return await imageCache(request);
        }
        
        // 3. 外部CDNリソース（Stale While Revalidate戦略）
        if (isDynamicResource(url)) {
            return await staleWhileRevalidate(request, DYNAMIC_CACHE);
        }
        
        // 4. HTMLページ（Network First戦略）
        if (isHTMLRequest(request)) {
            return await networkFirst(request, STATIC_CACHE);
        }
        
        // 5. その他（Network Only）
        return await fetch(request);
        
    } catch (error) {
        console.error('[SW] Fetch failed:', error);
        
        // オフライン時のフォールバック
        if (isHTMLRequest(request)) {
            const cache = await caches.open(STATIC_CACHE);
            return await cache.match('/index.html') || new Response('Offline');
        }
        
        return new Response('Offline', { status: 503 });
    }
}

/**
 * キャッシュファースト戦略
 */
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
        // バックグラウンドで更新チェック
        fetch(request)
            .then(response => {
                if (response.ok) {
                    cache.put(request, response.clone());
                }
            })
            .catch(() => {}); // エラーは無視
        
        return cached;
    }
    
    const response = await fetch(request);
    if (response.ok) {
        cache.put(request, response.clone());
    }
    
    return response;
}

/**
 * ネットワークファースト戦略
 */
async function networkFirst(request, cacheName) {
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        const cache = await caches.open(cacheName);
        const cached = await cache.match(request);
        
        if (cached) {
            return cached;
        }
        
        throw error;
    }
}

/**
 * Stale While Revalidate戦略
 */
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    // バックグラウンドで更新
    const fetchPromise = fetch(request)
        .then(response => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => {}); // エラーは無視
    
    // キャッシュがあれば即座に返す、なければ待つ
    return cached || await fetchPromise;
}

/**
 * 画像キャッシュ戦略（WebP対応）
 */
async function imageCache(request) {
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            // 画像サイズが大きすぎる場合はキャッシュしない（5MB制限）
            const contentLength = response.headers.get('content-length');
            if (!contentLength || parseInt(contentLength) < 5 * 1024 * 1024) {
                cache.put(request, response.clone());
            }
        }
        
        return response;
    } catch (error) {
        // オフライン時は代替画像を返す
        const fallbackResponse = await cache.match('/assets/images/placeholder.webp');
        return fallbackResponse || new Response('Image unavailable', { status: 503 });
    }
}

/**
 * リソースタイプ判定関数群
 */
function isStaticAsset(url) {
    return STATIC_ASSETS.some(asset => url.pathname === asset) ||
           url.pathname.match(/\.(css|js|woff2?)$/i);
}

function isImageRequest(url) {
    return IMAGE_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
}

function isDynamicResource(url) {
    return DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(url.href));
}

function isHTMLRequest(request) {
    return request.headers.get('accept')?.includes('text/html');
}

/**
 * キャッシュクリーンアップ（定期実行）
 */
async function cleanupCaches() {
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            const date = new Date(response.headers.get('date') || Date.now());
            const age = Date.now() - date.getTime();
            
            let maxAge = CACHE_STRATEGIES.static;
            if (cacheName === DYNAMIC_CACHE) maxAge = CACHE_STRATEGIES.dynamic;
            if (cacheName === IMAGE_CACHE) maxAge = CACHE_STRATEGIES.images;
            
            if (age > maxAge) {
                await cache.delete(request);
                console.log('[SW] Cleaned up expired cache:', request.url);
            }
        }
    }
}

/**
 * メッセージハンドラー
 */
self.addEventListener('message', event => {
    const { type, payload } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'CACHE_URLS':
            if (payload && payload.urls) {
                cacheUrls(payload.urls);
            }
            break;
            
        case 'CLEAR_CACHE':
            clearAllCaches();
            break;
            
        case 'GET_CACHE_SIZE':
            getCacheSize().then(size => {
                event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
            });
            break;
    }
});

/**
 * URL群の手動キャッシュ
 */
async function cacheUrls(urls) {
    const cache = await caches.open(DYNAMIC_CACHE);
    
    for (const url of urls) {
        try {
            await cache.add(url);
            console.log('[SW] Manually cached:', url);
        } catch (error) {
            console.warn('[SW] Failed to cache:', url, error);
        }
    }
}

/**
 * 全キャッシュクリア
 */
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
    
    console.log('[SW] All caches cleared');
}

/**
 * キャッシュサイズ取得
 */
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            const size = parseInt(response.headers.get('content-length') || '0');
            totalSize += size;
        }
    }
    
    return totalSize;
}

/**
 * 定期的なキャッシュクリーンアップの開始
 */
setInterval(cleanupCaches, 24 * 60 * 60 * 1000); // 24時間毎

console.log('[SW] Service Worker script loaded successfully');
