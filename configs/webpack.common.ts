import path from 'path';
import { fileURLToPath } from 'url';
import { swcConfig } from './swc.config.ts';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackDevConfig from './webpack.dev.ts';
import webpackProdConfig from './webpack.prod.ts';
import webpackPreviewConfig from './webpack.preview.ts';
import UnoCSS from '@unocss/webpack'
import unoConfig from '../uno.config'
import { merge } from 'webpack-merge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpackCommonConfig = {
  entry: {
    app: {
      import: './src/main.tsx',
      // filename: 'js/[name].[contenthash:8]-bounld.js',
      // chunkFilename: 'js/[name].[contenthash:8]-chunk.js'
      // dependOn: 'shared'
    },
    // shared:['lodash']
  },
  watchOptions: {
    ignored: [
      "node_modules",
      "**/hiberfil.sys",
      "**/swapfile.sys",
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:8]-bounld.js',
    chunkFilename: 'js/[name].[contenthash:8]-chunk.js',
    assetModuleFilename: 'assets/[hash:8][ext][query]',
    publicPath: '/',
    // clean: true, // 和下面使用的 CleanWebpackPlugin 效果冲突
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.tsx', '.less', '.css', 'scss'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname,'../src/components'),
    },
  },
  module: {
    rules: [
      //TODO 使用swc-loader解析tsx,jsx,ts,js文件
      {
        test: /\.(tsx|jsx|js|ts)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: swcConfig,
        }
      },
      //TODO 处理图片文件
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      //TODO 处理字体文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]',
        },
      },
      //TODO 处理其他文件
      {
        test: /\.(csv|xml)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]',
        },
      },
      //TODO 处理css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      //TODO 处理less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              postcssOptions: {
                syntax: 'postcss-less',
              },
            },
          }
        ],
      },
      //TODO 处理sass
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // options: {
            //   postcssOptions: {
            //     syntax: 'postcss-sass',
            //   },
            // },
          },
        ],
      },
    ]
  },
  plugins: [
    //TODO 处理html文件，将打包后的js文件注入html中把
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    UnoCSS(unoConfig),
  ]
}

function getWebpackConfig(mode: string) {
  let needMergeConfig;
  switch (mode) {
    case 'development':
      needMergeConfig = webpackDevConfig;
      break
    case 'production':
      needMergeConfig = webpackProdConfig;
      break
    case 'preview':
      needMergeConfig = webpackPreviewConfig;
      break
  }
  return merge(webpackCommonConfig, needMergeConfig);
}

export default getWebpackConfig;
