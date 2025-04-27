import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // 测试环境，使用 jsdom 模拟浏览器环境
  testEnvironment: 'jest-environment-jsdom',
  // 匹配测试文件的规则
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  // 使用 swc 作为转换器
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  // 模块文件扩展名
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
  },
  // 收集覆盖率信息
  collectCoverage: true,
  // 覆盖率报告的输出目录
  coverageDirectory: 'coverage',
  // 覆盖率报告的格式
  coverageReporters: ['text', 'lcov', 'html'],
};

export default config;