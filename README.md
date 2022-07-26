# Storefront Backend Project


## how to setup and connect to the database
* go to: 'http://127.0.0.1:3000'

## ports the backend and database
* Backend port: 3000
* Database port: 5432

## package installation
run `npm install`

## .env variables
NODE_ENV = dev
NODE_PORT = 3000

POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=store_front
POSTGRES_DB_TEST=store_front_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

BCRYPT_PASSWORD=speak-friend-and-enter
SALT_ROUND=10
TOKEN_SECRET=secret123


## Database Setup

### 1- Create postgres User
```sh
CREATE USER postgres WITH PASSWORD 'postgres'
```


### 2- Create databases
```sh
CREATE DATABASE store_front;
CREATE DATABASE store_front_test;
```

### 3- Grant all database perviliges to postgres user
```sh
GRANT ALL PRIVILEGES ON DATABASE store_front TO postgres;
GRANT ALL PRIVILEGES ON DATABASE store_front_test TO postgres;
```

### 4- Run migration
db-migrate up