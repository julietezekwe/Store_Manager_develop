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

const migrateSale = (id, sellerId, sales, totalPrize) => {
  const query = {
    text: 'INSERT INTO Sales(id, sellerId, sales, totalPrize) VALUES($1, $2, $3, $4) RETURNING *',
    values: [id, sellerId, sales, totalPrize],
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

const sales1 = [
  { productId: 1, productName: 'red shoe', prize: 100, quantity: 2, totalPrize: 200 },
  { productId: 2, productName: 'silver shoe', prize: 500, quantity: 10, totalPrize: 5000 },
];
const sales2 = [
  { productId: 3, productName: 'green shoes', prize: 500, quantity: 10, totalPrize: 5000 },
  { productId: 2, productName: 'silver shoe', prize: 500, quantity: 10, totalPrize: 5000 },
];
const sales3 = [
  { productId: 1, productName: 'red shoe', prize: 100, quantity: 2, totalPrize: 200 },
  { productId: 3, productName: 'green shoe', prize: 500, quantity: 5, totalPrize: 2500 },
];

migrateUser(1, 'admin', 'admin', 'admin@gmail.com', 'admin', 'admin');
migrateUser(2, 'chidimma', 'chidimma', 'chidimma@gmail.com', 'chidimma', 'attendant');
migrateUser(3, 'ogechi ibe', 'ogechi', 'ogechi@gmail.com', 'ogechi', 'attendant');
migrateUser(4, 'chinedu', 'chinedu', 'chinedu@gmail.com', 'ogechi', 'attendant');

migrateProduct(1, 'red shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 100, 100, 1, 'flat');
migrateProduct(2, 'silver shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 90, 1, 'hills');
migrateProduct(3, 'green shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 150, 1, 'ladies');
migrateProduct(4, 'green shoe', 'This is a very beautiful shoe', 'imageurl.jpg', 500, 150, 1, 'ladies');

migrateSale(1, 3, JSON.stringify(sales1), 200);
migrateSale(2, 2, JSON.stringify(sales2), 500);
migrateSale(3, 3, JSON.stringify(sales3), 5000);

migrateCategory(1, 'Flat');
migrateCategory(2, 'Hills');
migrateCategory(3, 'Ladies');

pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE sales_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE products_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE categories_id_seq RESTART WITH 100');
