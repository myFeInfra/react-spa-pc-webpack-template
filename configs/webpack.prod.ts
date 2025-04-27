import path from "path";
import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CompressionPlugin from "compression-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpackProdConfig = {
  stats: 'verbose', // 显示打包信息,可以根据自己喜好进行配置
  mode: "production", // 生产模式
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  optimization: {
    // code split 代码分割
    usedExports: true, // 标记未使用的导出
    providedExports: true, // 标记已使用的导出
    splitChunks: {
      chunks: "all",
      minSize: 20000, // 最小尺寸：20kb
      minRemainingSize: 0, // 防止和其他chunk合并成一个文件，这样它的文件体积就会很小
      minChunks: 1, // 最小引用次数
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数
      maxInitialRequests: 30, // 入口js文件最大并行请求数
      enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      cacheGroups: {
        // 缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
          priority: -10, // 优先级，先抽离第三方模块
          filename: 'js/[name].[contenthash:8]-vendor.js', // 打包后的文件名，任意命名
        },
        default: {
          // 抽离自己写的公共代码
          minChunks: 2, // 最小引用2次
          priority: -20, // 优先级
          reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          filename: 'js/[name].[contenthash:8]-common.js', // 打包后的文件名，任意命名
        }
      }
    },
    minimize: true, //压缩代码
    minimizer: [
      //TODO 压缩 ts 
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'], // 移除 console
          },
          output: {
            comments: false, // 移除注释
          },
        },
      }),
      // 压缩 css
      new CssMinimizerPlugin({
        parallel: true, // 开启多线程压缩
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }, // 移除注释
            },
          ],
        },
      }),
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false, // 启用删除文件
      verbose: true, // 启用详细输出
      // 确保不会删除 js 目录
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!js/**', // 排除 js 目录
        path.join(process.cwd(), 'build/**/*'),
      ],
      cleanAfterEveryBuildPatterns: [
        '**/*',
        '!js/**', // 排除 js 目录
        path.join(process.cwd(), 'build/**/*'),
      ],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    // TODO 最后优化
    new CompressionPlugin({
      test: /\.(js,ts,css,less,scss,jsx,tsx)$/, // 匹配文件名
      threshold: 1024 * 10, // 对超过10k的数据进行压缩
      deleteOriginalAssets: false, // 不删除源文件
      minRatio: 0.8, // 压缩比
    }),
  ]
}

export default webpackProdConfig;