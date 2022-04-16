import type { Config } from '@jest/types'
import { generalConfig } from '../local/local.config'

export default async (): Promise<Config.InitialOptions> => {
  return {
    ...generalConfig,
    rootDir: '.',
    testRegex: '.*\\.(spec)\\.ts$',
    coverageDirectory: '../coverageAcceptance',
  }
}
