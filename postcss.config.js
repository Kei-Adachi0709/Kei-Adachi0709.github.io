/**
 * PostCSS 設定 - CSS最適化とパフォーマンス向上
 * @description Google PageSpeed Insights 90点以上を目指すCSS処理設定
 */

module.exports = {
  plugins: [
    // ベンダープリフィックス自動追加
    require('autoprefixer')({
      browsers: ['> 1%', 'last 2 versions', 'not ie <= 11'],
      grid: 'autoplace',
      flexbox: 'no-2009'
    }),

    // CSS最適化（本番環境のみ）
    ...(process.env.NODE_ENV === 'production' ? [
      require('cssnano')({
        preset: ['advanced', {
          // 高度な最適化設定
          autoprefixer: false, // autoprefixerで既に処理済み
          discardComments: {
            removeAll: true
          },
          discardDuplicates: true,
          discardEmpty: true,
          discardOverridden: true,
          discardUnused: {
            fontFace: false, // フォントフェースは保持
            keyframes: false, // キーフレームは保持
            namespace: false,
            variables: false
          },
          mergeIdents: true,
          mergeRules: true,
          mergeLonghand: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeDisplayValues: true,
          normalizePositions: true,
          normalizeRepeatStyle: true,
          normalizeString: true,
          normalizeTimingFunctions: true,
          normalizeUnicode: true,
          normalizeUrl: true,
          normalizeWhitespace: true,
          orderedValues: true,
          reduceIdents: false, // アニメーション名は保持
          reduceInitial: true,
          reduceTransforms: true,
          svgo: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false
              },
              {
                name: 'removeDimensions',
                active: true
              }
            ]
          },
          uniqueSelectors: true,
          zindex: false // z-indexは変更しない
        }]
      }),

      // 未使用CSS削除（PurgeCSS）
      require('@fullhuman/postcss-purgecss')({
        content: [
          './index.html',
          './assets/js/**/*.js'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [
            // AOS（アニメーション）関連
            /^aos-/,
            /^data-aos/,
            
            // Swiper関連
            /^swiper-/,
            
            // 動的クラス
            /^is-/,
            /^has-/,
            /^js-/,
            /^no-js/,
            
            // 状態クラス
            'active',
            'inactive',
            'loading',
            'loaded',
            'error',
            'success',
            
            // レスポンシブクラス
            /^mobile-/,
            /^tablet-/,
            /^desktop-/,
            
            // ユーティリティクラス
            'hidden',
            'visible',
            'sr-only'
          ],
          deep: [
            // 疑似要素・疑似クラス
            /::before/,
            /::after/,
            /:hover/,
            /:focus/,
            /:active/,
            /:visited/
          ],
          greedy: [
            // パフォーマンス関連の動的クラス
            /performance-/,
            /webp-/,
            /lazy-/
          ]
        },
        rejected: true,
        printRejected: false
      }),

      // Critical CSS抽出サポート
      require('postcss-critical-split')({
        output: 'critical',
        startTag: 'critical:start',
        endTag: 'critical:end',
        blockTag: 'critical:block'
      })

    ] : []),

    // 開発環境での便利プラグイン
    ...(process.env.NODE_ENV === 'development' ? [
      // CSS構文チェック
      require('stylelint')({
        config: {
          extends: 'stylelint-config-standard-scss',
          rules: {
            'declaration-block-trailing-semicolon': 'always',
            'indentation': 2,
            'max-nesting-depth': 4,
            'selector-max-compound-selectors': 4,
            'declaration-no-important': true,
            'selector-no-qualifying-type': true,
            'shorthand-property-no-redundant-values': true
          }
        }
      }),

      // ソースマップ生成
      require('postcss-sourcemaps')
    ] : [])
  ]
};
