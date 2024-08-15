import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DBHOST,
  port: parseInt(process.env.DBPORT),
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  entities: [
    'src/modules/**/*.entity.ts',
  ],
  migrationsTableName: 'migrations',
  migrations: ['migrations/files/*.ts'],
  ssl: process.env.DBURL ? { rejectUnauthorized: false } : false,
})

export default dataSource
