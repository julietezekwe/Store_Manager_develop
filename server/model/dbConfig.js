import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();
let ssl = false;
if (process.env.NODE_ENV === 'production') {
  ssl = true;
}
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl,
});

export default pool;
