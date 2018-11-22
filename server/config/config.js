import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const defaultConfig = {
  connectionString: 'postgres://joshua:electrical@localhost:5432/sendIT',
};

const productionConfig = {
  DATABASE_URL:
    'postgres://otmxtbbeisxzjv:7773b9bf8c1fc81a944cd4de68899c326c7e826a081d6bf4b366ad9cc6095758@ec2-54-235-133-42.compute-1.amazonaws.com:5432/da1drvtqlctulg sslmode:require',
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
