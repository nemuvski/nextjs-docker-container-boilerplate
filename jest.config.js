const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  collectCoverage: false,
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
}

module.exports = createJestConfig(customJestConfig)
