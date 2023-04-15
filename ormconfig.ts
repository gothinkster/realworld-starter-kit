import { createDataSourceInstance } from './main/datasource'
export const config = createDataSourceInstance({
  migrationsTransactionMode: 'each',
  migrations: ['migrations/*.ts'],
})
export default [config]
