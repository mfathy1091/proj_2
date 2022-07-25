# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index >> 'products' [GET] 
- Show >> 'products/:productId' [GET] 
- Create [token required] >> 'products' [POST] 
- Update [token required] >> 'products/:productId' [PUT] 
- Update [token required] >> 'products/:productId' [DELETE] 

#### Users
- Index >> 'users' [GET] 
- Show >> 'users/:userId' [GET] 
- Create >> 'users' [POST] 

## DATABASE - Tables

#### products
-  id: number
- name: string
- price: string
- [OPTIONAL] category

#### users
- id >> SERIAL PRIMARY KEY
- firstName >> VARCHAR(50) NOT NULL
- lastName >> VARCHAR(50) NOT NULL
- password >> VARCHAR(255) NOT NULL

#### orders
- id >> SERIAL PRIMARY KEY
- user_id >> bigint REFERENCES users(id)
- status (of order: active or complete) >> VARCHAR(25)

#### Order_product

- id >> SERIAL PRIMARY KEY
- quantity >> integer
- order_id >> bigint REFERENCES orders(id)
- product_id >> bigint REFERENCES products(id)