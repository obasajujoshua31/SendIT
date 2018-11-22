import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const defaultConfig = {
  connectionString: process.env_DEV_DATABASE_URL,
};

const productionConfig = {
  connectionString: process.env.PROD_DATABASE_URL,
};
const getConf = () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    return defaultConfig;
  } else if (process.env.NODE_ENV === 'production') {
    return productionConfig;
  }
};
const pool = new Pool(getConf());

export default pool;
