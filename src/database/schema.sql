CREATE DATABASE jespetinhos;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    ingredients VARCHAR NOT NULL,
    price DECIMAL NOT NULL,
    category_id UUID,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS clients (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR,
    product_id UUID,
    FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
    orderd NUMERIC,
    requestedAt TIMESTAMP,
    product_id UUID,
    FOREIGN KEY(product_id) REFERENCES products(id),
    client_id UUID,
    FOREIGN KEY(client_id) REFERENCES clients(id)
);

