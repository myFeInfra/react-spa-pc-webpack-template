import getWebpackConfig from "./configs/webpack.common.ts";

export default function achieveWebpackConfig(
  env: { mode?: string } = { mode: "development" }) {
  if (!env.mode) {
    console.warn('未指定构建模式，默认使用 development 模式')
    env.mode = 'development'
  }
  return getWebpackConfig(env.mode)
}