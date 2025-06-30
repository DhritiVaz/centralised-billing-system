CREATE DATABASE central_billing_system;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK(role IN('admin','owner','franchise','cashier')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (user_id,username,password,role) VALUES(1,'SSS','ABCD','admin');