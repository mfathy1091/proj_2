CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL UNIQUE,
    password_digest VARCHAR NOT NULL
);