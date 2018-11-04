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

const migrateProduct = (id, productName, description, image, price, quantity, min, category) => {
  const query = {
    text: 'INSERT INTO Products(id, productName, description, image, price, quantity, min, category) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: [id, productName, description, image, price, quantity, min, category],
  };
  pool.query(query);
};

const migrateSale = (id, sellerId, totalprice) => {
  const query = {
    text: 'INSERT INTO Sales(id, sellerId, totalprice) VALUES($1, $2, $3) RETURNING *',
    values: [id, sellerId, totalprice],
  };
  pool.query(query);
};

const migrateCategory = (id, categoryName) => {
  const query = {
    text: 'INSERT INTO Categories(id, categoryName) VALUES($1, $2) RETURNING *',
    values: [id, categoryName],
  };
  pool.query(query);
};

const migrateProductSales = (id, productId, salesId, quantity) => {
  const query = {
    text: 'INSERT INTO product_sales(id, productId, salesId, quantity) VALUES($1, $2, $3, $4) RETURNING *',
    values: [id, productId, salesId, quantity],
  };
  pool.query(query);
};

migrateUser(1, 'admin', 'admin', 'admin@gmail.com', 'admin', 'admin');
migrateUser(2, 'chidimma', 'chidimma', 'chidimma@gmail.com', 'chidimma', 'attendant');
migrateUser(3, 'ogechi ibe', 'ogechi', 'ogechi@gmail.com', 'ogechi', 'attendant');
migrateUser(4, 'chinedu', 'chinedu', 'chinedu@gmail.com', 'ogechi', 'attendant');

migrateProduct(1, 'red shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 100, 100, 1, 'Not set');
migrateProduct(2, 'silver shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 90, 1, 'Not set');
migrateProduct(3, 'green shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 150, 1, 'Not set');
migrateProduct(4, 'green shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 150, 1, 'Not set');

migrateSale(1, 3, 200);
migrateSale(2, 2, 500);
migrateSale(3, 3, 5000);

migrateCategory(1, 'Flat');
migrateCategory(2, 'Hills');
migrateCategory(3, 'Ladies');

migrateProductSales(1, 2, 1, 2);
migrateProductSales(2, 2, 1, 10);
migrateProductSales(3, 3, 2, 10);
migrateProductSales(4, 4, 2, 10);
migrateProductSales(5, 1, 3, 2);
migrateProductSales(6, 3, 3, 5);

pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE sales_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE products_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE categories_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE product_sales_id_seq RESTART WITH 100');
