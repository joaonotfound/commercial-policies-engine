module.exports = {
  roots: ['<rootDir>/tests'],
  testMatch: ['<rootDir>/tests/**/*.test.(ts|js)'],
  // projects: ['frontend', 'backend'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
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
  ],
  testEnvironment: 'jsdom'
}
