import bcrypt from 'bcryptjs';
import pool from './dbConfig';

const migrateUser = (id, name, username, email, password, role) => {
  const hash = bcrypt.hashSync(password, 10);

  const query = {
    text: 'INSERT INTO Users(id, name, username, email, password, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING name, username, email, role, joined',
    values: [id, name, username, email, hash, role],
  };
  pool.query(query);
};

const migrateProduct = (id, productName, description, image, prize, quantity, min, category) => {
  const query = {
    text: 'INSERT INTO Products(id, productName, description, image, prize, quantity, min, category) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: [id, productName, description, image, prize, quantity, min, category],
  };
  pool.query(query);
};

const migrateSale = (id, sellerId, productId, productName, prize, quantity, totalPrize) => {
  const query = {
    text: 'INSERT INTO Sales(id, sellerId, productId, productName, prize, quantity, totalPrize) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [id, sellerId, productId, productName, prize, quantity, totalPrize],
  };
  pool.query(query);
};

migrateUser(1, 'admin', 'admin', 'admin@gmail.com', 'admin', 'admin');
migrateUser(2, 'chidimma', 'chidimma', 'chidimma@gmail.com', 'chidimma', 'attendant');
migrateUser(3, 'ogechi ibe', 'ogechi', 'ogechi@gmail.com', 'ogechi', 'attendant');
migrateUser(4, 'chinedu', 'chinedu', 'chinedu@gmail.com', 'ogechi', 'attendant');

migrateProduct(1, 'red shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 100, 100, 1, 'flat');
migrateProduct(2, 'silver shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 90, 1, 'hills');
migrateProduct(3, 'green shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 150, 1, 'ladies');
migrateProduct(4, 'green shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 150, 1, 'ladies');

migrateSale(1, 3, 2, 'red shoe', 100, 2, 200);
migrateSale(2, 2, 3, 'silver shoe', 500, 1, 500);
migrateSale(3, 3, 3, 'green shoe', 500, 10, 5000);

pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE sales_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE products_id_seq RESTART WITH 100');
