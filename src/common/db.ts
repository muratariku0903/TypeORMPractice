import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "test",
  password: "passw0rd",
  database: "test",
}

const AppDataSource = new DataSource(dbConfig);

const initDataSource = async () => {
  console.info();

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    if (!AppDataSource.isInitialized) {
      console.log('error ')
    }
  } catch (e) {

  }
}
