import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: './db/data/database.sqlite',
  synchronize: false,
  migrationsRun: true,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/db/migrations/*.js'],
});
