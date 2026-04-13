# Centralized Billing & Inventory Management System

A full-stack billing and inventory management system built with React, Node.js, Express, and PostgreSQL for streamlined operations and centralized control.

---

## Overview

This system provides a unified platform to manage franchises, inventory, and sales with role-based access and real-time data flow between frontend and backend.

Designed for scalability and structured business operations.

---

## Features

- Role-based authentication (Admin, Owner, Franchise, Cashier)
- Franchise and product management (Create, Update, Delete)
- Central and franchise-level inventory tracking
- Sales tracking (customer and franchise)
- Secure JWT-based authentication
- Integrated frontend and backend communication

---

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: PostgreSQL
- ORM: Prisma (if used)
- Authentication: JWT

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/SHARVESH08/Centralized-Billing-And-Inventory-Management-System.git
cd Centralized-Billing-And-Inventory-Management-System
````

### Install Dependencies

#### Backend

```bash
cd CentralisedBillingAndManagementSystem/Backend
npm install
```

#### Frontend

```bash
cd ../
npm install
```

---

## Running the Application

```bash
npm start
```

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:5001](http://localhost:5001)

---

## Database Setup (PostgreSQL)

### Create Database

```sql
CREATE DATABASE roles;
```

---

### Core Tables

#### Users

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(25) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin','owner','franchise','cashier')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### Products

```sql
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  manufacturer VARCHAR(100),
  price NUMERIC(10,2)
);
```

---

#### Product (GST Enabled)

```sql
CREATE TABLE Product (
  ProductID SERIAL PRIMARY KEY,
  ProductName VARCHAR(255) NOT NULL,
  HSNCode VARCHAR(50) NOT NULL,
  Cost DECIMAL(10,2) NOT NULL,
  SGST_Percentage DECIMAL(5,2) NOT NULL,
  CGST_Percentage DECIMAL(5,2) NOT NULL,
  SGST_Amount DECIMAL(10,2) GENERATED ALWAYS AS (ROUND((Cost * SGST_Percentage / 100),2)) STORED,
  CGST_Amount DECIMAL(10,2) GENERATED ALWAYS AS (ROUND((Cost * CGST_Percentage / 100),2)) STORED,
  TotalCost DECIMAL(10,2) GENERATED ALWAYS AS (ROUND((Cost + SGST_Amount + CGST_Amount),2)) STORED,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### Franchise

```sql
CREATE TABLE Franchise (
  FranchiseID SERIAL PRIMARY KEY,
  FranchiseName VARCHAR(255) NOT NULL,
  OwnerName VARCHAR(255) NOT NULL,
  ContactNumber VARCHAR(20) NOT NULL,
  EmailAddress VARCHAR(255) UNIQUE NOT NULL,
  DoorNo VARCHAR(50),
  StreetName VARCHAR(255),
  CityOrVillage VARCHAR(255),
  DistrictName VARCHAR(255),
  Pincode VARCHAR(10),
  Geolocation POINT,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### Customer Sales

```sql
CREATE TABLE customersale (
  saleid SERIAL PRIMARY KEY,
  franchiseid INTEGER NOT NULL,
  invoiceno VARCHAR NOT NULL UNIQUE,
  products JSONB,
  customername VARCHAR(255),
  contactno VARCHAR(20),
  emailid VARCHAR(255),
  address TEXT[],
  geolocation POINT,
  datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paymentmethod TEXT
);
```

---

#### Franchise Stock

```sql
CREATE TABLE FranchiseStock (
  StockID SERIAL PRIMARY KEY,
  FranchiseID INT REFERENCES Franchise(FranchiseID) ON DELETE CASCADE,
  ProductID INT REFERENCES Product(ProductID) ON DELETE CASCADE,
  QuantityAvailable INT NOT NULL DEFAULT 0,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Authentication

* JWT stored in localStorage
* Token expiry: 1 hour
* Protected routes using custom middleware/components
* Role-based access control enforced across the system

---

## Scripts

| Command        | Description                     |
| -------------- | ------------------------------- |
| npm install    | Install dependencies            |
| npm run dev    | Run frontend (dev mode)         |
| npm run server | Run backend                     |
| npm run client | Run frontend                    |
| npm start      | Run frontend + backend together |
