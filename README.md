# 🛒 Walmart Scan & Go Application

A modern retail solution that allows customers to scan products with their phones and pay instantly, eliminating traditional checkout lines.

## 🏗️ Architecture

- **Frontend**: React 19 + Vite + React Router
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **Barcode Scanner**: @zxing/library for camera-based scanning

## 🚀 Features

- 📱 **Barcode Scanning**: Real-time product scanning using device camera
- 🛍️ **Shopping Cart**: Add scanned items with automatic cost calculation
- 💳 **Instant Checkout**: Pay without traditional checkout lines
- 📊 **Inventory Management**: Real-time product and stock tracking
- 🧾 **Purchase History**: Complete transaction records
- 🔍 **Product Search**: Find products by barcode hash

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v12+)
- Modern web browser with camera access

## ⚙️ Setup Instructions

### 1. Database Setup

1. Install PostgreSQL and create a database:
   ```sql
   CREATE DATABASE walmart_scan_go;
   ```

2. Run the database setup script:
   ```bash
   psql -U your_username -d walmart_scan_go -f server/database_setup.sql
   ```

### 2. Environment Configuration

1. Update `server/.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=walmart_scan_go
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```

### 3. Server Setup

```bash
cd server
npm install
npm run dev
```

The server will start on `http://localhost:6790`

### 4. Client Setup

```bash
cd client/walmart
npm install
npm run dev
```

The client will start on `http://localhost:5173`

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products` | Add new product to inventory |
| GET | `/api/search?hash={barcode}` | Search product by barcode |
| POST | `/api/approve` | Process purchase and update inventory |

## 📱 How to Use

1. **Start Shopping**: Open the application and navigate to the scanner
2. **Scan Products**: Use your device camera to scan product barcodes
3. **Review Cart**: Check items and total cost
4. **Checkout**: Approve purchase to complete transaction

## 🗃️ Database Schema

### Products Table
- `hash_id` (BIGINT): UPC barcode identifier (Primary Key)
- `name` (TEXT): Product name
- `cost` (NUMERIC): Product price
- `quantity` (INTEGER): Available stock
- `location` (TEXT): Store location/aisle
- `rfid_status` (TEXT): Inventory status ('available', 'used')

### Purchases Table
- `purchase_id` (UUID): Unique transaction identifier (Primary Key)
- `total_cost` (NUMERIC): Total purchase amount
- `time` (TIMESTAMP): Purchase timestamp
- `location` (TEXT): Store location
- `user_id` (INTEGER): Customer identifier

## 🔧 Development

### Adding New Products
Use the `/add` route to add products to the inventory system.

### Barcode Format
The system converts UPC-11 to UPC-12 format automatically using check digit calculation.

### RFID Integration
Products have RFID status tracking for inventory management.

## 🚦 Running the Application

1. Start PostgreSQL service
2. Start the backend server: `npm run dev` (in server directory)
3. Start the frontend: `npm run dev` (in client/walmart directory)
4. Access the application at `http://localhost:5173`

## 📝 Next Steps

- [ ] Add user authentication system
- [ ] Implement payment gateway integration
- [ ] Add push notifications for offers
- [ ] Implement offline scanning capabilities
- [ ] Add admin dashboard for inventory management
