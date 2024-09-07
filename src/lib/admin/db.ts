// lib/db.ts
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'sql208.epizy.com',
  user: 'epiz_32064705',
  password: 'qg7eSdWThXQEl',
  database: 'epiz_32064705_magento'
});

export default connection;
