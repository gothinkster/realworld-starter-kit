import type { Config } from '@jest/types'

export const generalConfig: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  preset: 'ts-jest',
  testRegex: '.*\\.(unit|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverageAll',
  testEnvironment: 'node',
}

module.exports = generalConfig
