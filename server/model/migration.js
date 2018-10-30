import pool from './dbConfig';

pool.query('CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY, name VARCHAR(100) not null, username VARCHAR(100) UNIQUE not null, email VARCHAR(100) not null, password VARCHAR(100) not null, role VARCHAR(100) not null, joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS Products(id SERIAL PRIMARY KEY, productName VARCHAR(100) not null, description TEXT not null, image VARCHAR(100) not null, price INTEGER not null, quantity INTEGER not null, min INTEGER not null, category VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS Sales(id SERIAL PRIMARY KEY, sellerId INTEGER not null, totalprice INTEGER not null, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS Categories(id SERIAL PRIMARY KEY, categoryName VARCHAR(100) not null, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS product_sales(id SERIAL PRIMARY KEY, productId INTEGER not null, salesID INTEGER not null, quantity INTEGER not null, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
