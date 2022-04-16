import type { Config } from '@jest/types'

async function exportConfig(): Promise<Config.InitialOptions> {
  return {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    preset: 'ts-jest',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    testEnvironment: 'node',
    testRegex: '.*\\.(spec)\\.ts$',
    coverageDirectory: '../coverageAcceptance',
  }
}

module.exports = exportConfig
