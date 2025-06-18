const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // エントリーポイント
  entry: {
    main: './assets/js/main.js'
  },

  // 出力設定
  output: {
    path: path.resolve(__dirname, 'assets/dist'),
    filename: 'js/[name].bundle.js',
    clean: true
  },

  // モード設定
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  // ソースマップ設定
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',

  // モジュール解決設定
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'assets')
    }
  },

  // モジュールローダー設定
  module: {
    rules: [
      // JavaScript処理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // CSS/SCSS処理
      {
        test: /\.(css|scss|sass)$/,
        use: [
          process.env.NODE_ENV === 'production' 
            ? MiniCssExtractPlugin.loader 
            : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      // 画像処理
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },

      // フォント処理
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  },

  // プラグイン設定
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],

  // 最適化設定
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  },

  // 開発サーバー設定
  devServer: {
    static: {
      directory: path.join(__dirname, './')
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    watchFiles: ['*.html', 'assets/**/*']
  }
};
