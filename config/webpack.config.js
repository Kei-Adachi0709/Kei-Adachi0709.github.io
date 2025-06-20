const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // エントリーポイント（コード分割対応）
  entry: {
    critical: './assets/js/critical.js',
    main: './assets/js/main.js',
    performance: './assets/js/performance.js',
    analytics: './assets/js/analytics.js',
    imageOptimization: './assets/js/image-optimization.js'
  },

  // 出力設定（パフォーマンス最適化）
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: isProduction ? 'js/[name].[contenthash:8].bundle.js' : 'js/[name].bundle.js',
    chunkFilename: isProduction ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
    assetModuleFilename: isProduction ? '[path][name].[contenthash:8][ext]' : '[path][name][ext]',
    clean: true,
    publicPath: '/assets/dist/'
  },

  // モード設定
  mode: isProduction ? 'production' : 'development',

  // ソースマップ設定（本番では軽量化）
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  // モジュール解決設定
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'assets'),
      '@css': path.resolve(__dirname, 'assets/css'),
      '@js': path.resolve(__dirname, 'assets/js'),
      '@images': path.resolve(__dirname, 'assets/images')
    }
  },

  // モジュールローダー設定
  module: {
    rules: [
      // JavaScript処理（ES6+対応、最新ブラウザ向け最適化）
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
                },
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3
              }]
            ],
            plugins: [
              '@babel/plugin-proposal-dynamic-import',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },

      // CSS/SCSS処理（PostCSS自動プリフィックス、最適化）
      {
        test: /\.(css|scss|sass)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: !isProduction
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                  'cssnano'
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction
            }
          }
        ]
      },

      // 画像処理（WebP変換、最適化、レスポンシブ対応）
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192 // 8KB以下はインライン化
          }
        },
        generator: {
          filename: 'images/[name].[contenthash:8][ext]'
        },
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.sharpMinify,
                options: {
                  encodeOptions: {
                    jpeg: { quality: 85, progressive: true },
                    png: { quality: 85, progressive: true },
                    webp: { quality: 85 }
                  }
                }
              },
              generator: [
                {
                  preset: 'webp-custom-name',
                  implementation: ImageMinimizerPlugin.sharpGenerate,
                  options: {
                    encodeOptions: {
                      webp: { quality: 85 }
                    }
                  }
                }
              ]
            }
          }
        ]
      },

      // WebP画像処理
      {
        test: /\.webp$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash:8][ext]'
        }
      },

      // フォント処理（WOFF2最適化）
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]'
        }
      }
    ]
  },

  // プラグイン設定（本番ビルド最適化）
  plugins: [
    // CSS抽出とminify
    new MiniCssExtractPlugin({
      filename: isProduction ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      chunkFilename: isProduction ? 'css/[id].[contenthash:8].css' : 'css/[id].css'
    }),

    // Gzip圧縮（本番のみ）
    ...(isProduction ? [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8
      })
    ] : []),

    // バンドル分析（環境変数で有効化）
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : [])
  ],

  // 最適化設定（詳細なコード分割とminify）
  optimization: {
    minimize: isProduction,
    minimizer: [
      // JavaScript最適化
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // console.log削除
            drop_debugger: true,
            pure_funcs: ['console.log']
          },
          mangle: true,
          format: {
            comments: false
          }
        },
        extractComments: false
      }),

      // CSS最適化
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true
            }
          ]
        }
      })
    ],

    // 高度なコード分割戦略
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 3,
      maxAsyncRequests: 5,
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        // 外部ライブラリ
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true
        },
        
        // 共通コード
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
          enforce: true
        },

        // CSS共通
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true
        }
      }
    },

    // ランタイムチャンクの分離
    runtimeChunk: {
      name: 'runtime'
    },

    // モジュール連結の最適化
    concatenateModules: true,

    // 副作用なしモジュールの最適化
    sideEffects: false
  },
  // 開発サーバー設定（HMR最適化）
  devServer: {
    static: {
      directory: path.join(__dirname, './')
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ['*.html', 'assets/**/*'],
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },

  // パフォーマンスヒント
  performance: {
    hints: isProduction ? 'warning' : false,
    maxEntrypointSize: 250000,
    maxAssetSize: 250000
  },

  // 統計情報の設定
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
};
