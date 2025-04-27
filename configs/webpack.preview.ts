import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webpackPreviewConfig = {
  mode: 'development', // 开发模式
  devtool: 'source-map', // 开发环境使用eval-source-map
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'), // 静态文件目录
    },
    compress: true, // 启用 gzip 压缩
    port: 4000, // 服务器端口
    open: true, // 自动打开浏览器
    hot: true, // 启用模块热替换
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:4000',
        pathRewrite: {
          '^/api': '',
        },
      },
    ],
  },
}

export default webpackPreviewConfig;