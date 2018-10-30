import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let ssl = false;
let connectionString = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'production') ssl = true;
if (process.env.NODE_ENV === 'test') connectionString = process.env.DATABASE_URL_TEST;
const pool = new Pool({
  connectionString,
  ssl,
});

export default pool;
