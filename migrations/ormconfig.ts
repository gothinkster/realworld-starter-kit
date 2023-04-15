import { getDataSourceInstance } from '../main/datasource'
export const config = getDataSourceInstance({
  migrationsTransactionMode: 'each',
  // migrations pattern timestamp plus name dot ts
  migrations: ['migrations/files/*.ts'],
})
export default [config]
