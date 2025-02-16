import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: './db/database.sqlite',
  synchronize: false,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./db/migrations/**'],
});
