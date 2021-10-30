module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/modules/**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', '.'],
  moduleNameMapper: {
    '^@Modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@Components/(.*)$': '<rootDir>/src/common/components/$1',
    '^@Contexts/(.*)$': '<rootDir>/src/common/contexts/$1',
    '^@Helpers/(.*)$': '<rootDir>/src/common/helpers/$1',
    '^@Hooks/(.*)$': '<rootDir>/src/common/hooks/$1',
    '^@Interfaces/(.*)$': '<rootDir>/src/common/interfaces/$1',
    '^@Services/(.*)$': '<rootDir>/src/common/services/$1',
    '^@Api/(.*)$': '<rootDir>/src/common/api/$1',
    '^@Redux/(.*)$': '<rootDir>/src/common/redux/$1',
    '^@Config/(.*)$': '<rootDir>/src/common/config/$1',
    '^@Libs/(.*)$': '<rootDir>/src/common/libs/$1',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/utils/styles/styleMock.ts'
  }
}
