// lib/db.ts
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'm2-hedlessui.cpguoai6qub6.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'dSi49B9ABnqRS6EKEHOY',
  database: 'magento'
});

export default connection;
