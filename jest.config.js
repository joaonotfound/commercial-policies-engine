module.exports = {
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
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
    '<rootDir>/src/**/*.vue',
    '<rootDir>/src/**/*.ts'
  ],
  testEnvironment: 'jsdom'
}
