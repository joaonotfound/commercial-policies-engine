// import baseConfig from '../jest.config'

module.exports = {
  // ...baseConfig,
  roots: ['<rootDir>/tests'],

  // projects: ['frontend', 'backend'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
    // '@/front/(.*)': '<rootDir>/frontend/src/$1'
    // '^@/(.*)$': '<rootDir>/src/$1'
    // '^~/(.*)$': '<rootDir>/$1'
    // '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    // '<rootDir>/src/view/components/**/*.vue',
    // '<rootDir>/src/view/pages/**/*.vue'
    '<rootDir>/src/**/*.ts'
  ]
  //   testEnvironment: 'jsdom'
}
