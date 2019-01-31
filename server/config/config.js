import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const defaultConfig = {
  connectionString: process.env.DEV_DATABASE_URL,
};

const productionConfig = {
  connectionString: process.env.PROD_DATABASE_URL,
};

const testConfig = {
  connectionString: process.env.TEST_DATABASE_URL,
};
const getConf = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return testConfig;

    case 'production':
      return productionConfig;

    default:
      return defaultConfig;
  }
};
const pool = new Pool(getConf());

export default pool;
