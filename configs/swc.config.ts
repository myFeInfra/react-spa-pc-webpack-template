export const swcConfig = {
  sourceMaps: true, // 生成 Source Map
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
      decorators: true
    },
    transform: {
      react: {
        runtime: 'automatic',
      },
    },
    minify: {
      compress: process.env.NODE_ENV === 'production', // 生产环境开启代码压缩
      mangle: process.env.NODE_ENV === 'production' // 生产环境开启变量混淆
    }
  },
  module: {
    type: 'es6'
  }
};