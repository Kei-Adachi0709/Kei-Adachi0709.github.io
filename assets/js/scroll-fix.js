// ==========================================================================
// スクロール制御統合修正ファイル
// Unified Scroll Control Fix
// ==========================================================================

/**
 * グローバルスクロール制御の状態管理
 */
class ScrollController {
    constructor() {
        this.isScrollDisabled = false;
        this.scrollPosition = 0;
        this.preventScrollHandlers = [];
        this.init();
    }

    init() {
        // ページ読み込み時にスクロールを強制リセット
        this.forceResetScroll();
        
        // 全てのイベントハンドラーを初期化
        this.setupEventHandlers();
        
        // ページ離脱時の安全措置
        this.setupPageUnloadHandlers();
    }

    /**
     * スクロール位置を強制的にリセット
     */
    forceResetScroll() {
        // すべてのスクロール制御を解除
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.overflow = '';
        
        // スクロール関連のクラスを削除
        document.body.classList.remove('note-modal-open', 'scroll-disabled', 'no-scroll');
        document.documentElement.classList.remove('note-modal-open', 'scroll-disabled', 'no-scroll');
        
        // data属性を削除
        document.body.removeAttribute('data-scroll-y');
        document.body.removeAttribute('data-scroll-locked');
        
        // HTMLのスタイルもリセット
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        
        // 状態をリセット
        this.isScrollDisabled = false;
        this.scrollPosition = 0;
        
        console.log('ScrollController: スクロール状態を強制リセットしました');
    }    /**
     * スクロールを無効化
     */
    disableScroll() {
        if (this.isScrollDisabled) {
            console.warn('ScrollController: 既にスクロールは無効化済みです');
            return;
        }

        // 現在のスクロール位置を記録
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        // bodyを固定
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.style.left = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        
        // 追加の保護
        document.documentElement.style.overflow = 'hidden';
        
        // クラスとデータ属性を追加
        document.body.classList.add('note-modal-open');
        document.body.setAttribute('data-scroll-y', this.scrollPosition.toString());
        document.body.setAttribute('data-scroll-locked', 'true');
        
        this.isScrollDisabled = true;
        
        console.log(`ScrollController: スクロールを無効化しました (位置: ${this.scrollPosition})`);
        
        // デバッグ用: 現在の状態をコンソールに出力
        setTimeout(() => {
            console.log('ScrollController Debug After Disable:', {
                bodyPosition: document.body.style.position,
                bodyTop: document.body.style.top,
                bodyOverflow: document.body.style.overflow,
                htmlOverflow: document.documentElement.style.overflow,
                isScrollDisabled: this.isScrollDisabled,
                savedPosition: this.scrollPosition
            });
        }, 10);
    }    /**
     * スクロールを有効化
     */
    enableScroll() {
        if (!this.isScrollDisabled) {
            console.warn('ScrollController: スクロールは既に有効です');
            return;
        }

        // 固定を解除
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // HTMLの固定も解除
        document.documentElement.style.overflow = '';
        
        // クラスを削除
        document.body.classList.remove('note-modal-open');
        document.body.removeAttribute('data-scroll-y');
        document.body.removeAttribute('data-scroll-locked');
        
        // スクロール位置を復元
        if (this.scrollPosition > 0) {
            window.scrollTo(0, this.scrollPosition);
            
            // 復元を確実にするため、少し遅延させてもう一度実行
            setTimeout(() => {
                window.scrollTo(0, this.scrollPosition);
            }, 10);
            
            // さらに確実にするため、もう一度実行
            setTimeout(() => {
                window.scrollTo(0, this.scrollPosition);
            }, 50);
        }
        
        this.isScrollDisabled = false;
        
        console.log(`ScrollController: スクロールを有効化しました (復元位置: ${this.scrollPosition})`);
        
        // デバッグ用: 現在の状態をコンソールに出力
        setTimeout(() => {
            console.log('ScrollController Debug After Enable:', {
                bodyPosition: document.body.style.position,
                bodyTop: document.body.style.top,
                bodyOverflow: document.body.style.overflow,
                htmlOverflow: document.documentElement.style.overflow,
                isScrollDisabled: this.isScrollDisabled,
                currentScrollY: window.pageYOffset || document.documentElement.scrollTop,
                restoredPosition: this.scrollPosition
            });
        }, 100);
        
        // 位置をリセット
        this.scrollPosition = 0;
    }

    /**
     * 安全にスクロールを切り替え
     */
    toggleScroll(disable = false) {
        if (disable) {
            this.disableScroll();
        } else {
            this.enableScroll();
        }
    }

    /**
     * イベントハンドラーの設定
     */
    setupEventHandlers() {
        // ESCキーでスクロールを強制有効化
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isScrollDisabled) {
                    this.enableScroll();
                }
            }
        });

        // ウィンドウのリサイズ時に修正
        window.addEventListener('resize', () => {
            if (this.isScrollDisabled) {
                // リサイズ時にスタイルを再適用
                document.body.style.width = '100%';
            }
        });

        // フォーカス制御（モーダル外へのフォーカス移動を防ぐ）
        document.addEventListener('focusin', (e) => {
            if (this.isScrollDisabled) {
                const modal = document.querySelector('.note-modal');
                if (modal && !modal.contains(e.target)) {
                    const focusableElements = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
            }
        });
    }

    /**
     * ページ離脱時の安全措置
     */
    setupPageUnloadHandlers() {
        // ページ離脱前にスクロールを有効化
        window.addEventListener('beforeunload', () => {
            this.forceResetScroll();
        });

        // ページ非表示時にもリセット
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isScrollDisabled) {
                this.enableScroll();
            }
        });

        // popstate（戻るボタン）時にもリセット
        window.addEventListener('popstate', () => {
            this.forceResetScroll();
        });
    }

    /**
     * 現在のスクロール状態を取得
     */
    getScrollState() {
        return {
            isDisabled: this.isScrollDisabled,
            savedPosition: this.scrollPosition,
            currentPosition: window.pageYOffset || document.documentElement.scrollTop || 0
        };
    }
}

// グローバルスクロールコントローラーのインスタンス化
window.scrollController = new ScrollController();

/**
 * レガシー関数のオーバーライド（後方互換性）
 */
window.restoreScroll = function() {
    window.scrollController.enableScroll();
};

window.disableScroll = function() {
    window.scrollController.disableScroll();
};

/**
 * モーダル制御の統合（簡略化版）
 */
class ModalController {
    constructor(scrollController) {
        this.scrollController = scrollController;
        this.currentModal = null;
    }

    openModal(modalElement) {
        console.log('ModalController: モーダルを開く処理をスキップ（note-app.jsで制御）');
        this.currentModal = modalElement;
    }

    closeModal() {
        console.log('ModalController: モーダルを閉じる処理をスキップ（note-app.jsで制御）');
        this.currentModal = null;
    }
}

// グローバルモーダルコントローラーのインスタンス化
window.modalController = new ModalController(window.scrollController);

/**
 * デバッグ用関数
 */
window.debugScrollState = function() {
    const state = window.scrollController.getScrollState();
    console.log('=== スクロール状態デバッグ ===');
    console.log('スクロール無効化:', state.isDisabled);
    console.log('保存された位置:', state.savedPosition);
    console.log('現在の位置:', state.currentPosition);
    console.log('body classes:', document.body.className);
    console.log('body style:', document.body.style.cssText);
    console.log('html style:', document.documentElement.style.cssText);
    console.log('=============================');
};

// DOMContentLoaded時に初期化完了をログ出力
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('ScrollController: 初期化完了');
        
        // 開発環境では状態をコンソールに出力
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            window.debugScrollState();
        }
    }, 100);
});

console.log('scroll-fix.js loaded successfully');
