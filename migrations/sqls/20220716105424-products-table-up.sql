CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(64) NOT NULL, 
    price NUMERIC(12, 2) NOT NULL
);