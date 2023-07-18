import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  //add directories here to include them in coverage reports and threshold
  collectCoverageFrom: [
    './src/components/**',
    './src/contexts/**', 
    './src/pages/**', 
    '!./src/pages/_app.tsx'
  ], 
  coverageThreshold: { //require 100% code coverage for the tests to pass
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)