CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    status VARCHAR(25), 
    user_id bigint REFERENCES users(id)
);