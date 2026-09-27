# MERN Expense Management Application

A full-stack personal finance and expense management web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides authentication, expense CRUD operations, categorized spending analysis, multi-attribute filtering, financial dashboards, and CSV report export.

---

## Technologies Used

### Frontend
- **React.js 18**
- **Vite**
- **Vanilla CSS (Design Tokens, Custom Themes, Responsive Layout)**
- **Lucide React**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **JSON Web Tokens (jsonwebtoken)**
- **Bcrypt.js**
- **Cors & Dotenv**

---

## Architectural Pattern

The backend follows an enterprise N-tier layered architecture:

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── expenseController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── validateMiddleware.js
├── model/
│   └── index.js
├── models/
│   ├── expenseModel.js
│   └── userModel.js
├── repository/
│   ├── expenseRepository.js
│   └── userRepository.js
├── routes/
│   ├── authRoutes.js
│   ├── expenseRoutes.js
│   └── index.js
├── services/
│   ├── authService.js
│   └── expenseService.js
├── .env
├── .env.example
├── package.json
└── server.js
```

### Layer Responsibilities
- **Routes Layer**: Exposes REST API endpoints and maps them to controllers with validation and authentication middlewares.
- **Middlewares Layer**: Handles JWT authentication verification, request payload validation, and global error handling.
- **Controllers Layer**: Extracts HTTP request body, params, and query strings, invokes the business service layer, and returns formatted JSON HTTP responses.
- **Services Layer**: Encapsulates business logic, data sanitization, calculations, hashing, and token issuance.
- **Repository Layer**: Encapsulates database queries and data mutations using Mongoose models.
- **Models Layer**: Defines Mongoose schemas, data types, constraints, and relationships.

---

## Features

### Authentication & Authorization
- User registration with name, email, and password.
- Secure password hashing using salt and bcrypt.
- JWT-based authentication for state persistence.
- Complete data isolation: users can only view, edit, search, and delete their own expenses.

### Expense Management (CRUD)
- Create new expenses with title, positive amount, category, date, payment method, and optional description.
- View list of all transactions with details visible on each card/row.
- Update existing expense records.
- Delete expenses with a confirmation modal to avoid accidental data loss.

### Categories Supported
- Food
- Travel
- Shopping
- Bills
- Entertainment
- Health
- Education
- Other

### Payment Methods Supported
- Cash
- Credit Card
- Debit Card
- UPI
- Net Banking
- Other

### Search & Multi-Filter System
- Full-text search across titles and descriptions.
- Filter by category.
- Filter by payment method.
- Filter by custom date ranges (From Date to To Date).
- Sort by date (newest or oldest) and amount (highest or lowest).
- One-click filter reset.

### Financial Dashboard
- Total spending metric card.
- Total transactions count.
- Current month's total spending and count.
- Real-time category-wise spending progress bars with percentage and monetary breakdown.
- Payment method breakdown.
- Quick preview of the 5 most recent transactions with shortcut to add or view all.

### Bonus Features
- CSV export for filtered or complete expense transactions.
- Client-side and server-side data validations for empty fields, invalid emails, negative amounts, and invalid dates.
- Interactive modal dialogs with escape/backdrop closures.
- Dynamic toast notifications for operational feedback.

---

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/expense_tracker
JWT_SECRET=super_secret_jwt_key_expense_management_2025
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

## Database Setup Instructions

1. **Option A: Local MongoDB**
   - Ensure MongoDB is installed on your machine.
   - Start the service:
     - On macOS: `brew services start mongodb-community`
     - On Linux: `sudo systemctl start mongod`
     - On Windows: Start the MongoDB service via Services management.
   - Default URI: `mongodb://127.0.0.1:27017/expense_tracker`

2. **Option B: MongoDB Atlas (Cloud)**
   - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Obtain your connection string.
   - Set `MONGODB_URI` in `backend/.env`:
     ```env
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense_tracker?retryWrites=true&w=majority
     ```

---

## Installation & Running Instructions

### 1. Install All Dependencies

From the `MERN Expense Management` directory:

```bash
npm run install:all
```

Or install individually:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. How to Run the Backend

```bash
cd backend
npm run dev
```

The backend server runs at `http://localhost:5001`.

### 3. How to Run the Frontend

```bash
cd frontend
npm run dev
```

The frontend application runs at `http://localhost:5173`.

### 4. How to Run Both Concurrently

From the root directory:

```bash
npm run dev
```

---

## API Documentation

### Base URL
`http://localhost:5001/api`

### Authentication Endpoints

#### 1. Register User
- **Method**: `POST`
- **Path**: `/auth/register`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "6740b2a8d3f1a23456789abc",
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
  }
  ```

#### 2. Login User
- **Method**: `POST`
- **Path**: `/auth/login`
- **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "6740b2a8d3f1a23456789abc",
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
  }
  ```

#### 3. Get Current User Profile
- **Method**: `GET`
- **Path**: `/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "6740b2a8d3f1a23456789abc",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
  ```

---

### Expense Endpoints (All Require `Authorization: Bearer <token>`)

#### 1. Create Expense
- **Method**: `POST`
- **Path**: `/expenses`
- **Request Body**:
  ```json
  {
    "title": "Weekly Groceries",
    "amount": 75.50,
    "category": "Food",
    "date": "2025-05-15",
    "paymentMethod": "Credit Card",
    "description": "Vegetables, dairy, and pantry items"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Expense created successfully",
    "data": {
      "_id": "6740b2e8d3f1a23456789def",
      "user": "6740b2a8d3f1a23456789abc",
      "title": "Weekly Groceries",
      "amount": 75.5,
      "category": "Food",
      "date": "2025-05-15T00:00:00.000Z",
      "paymentMethod": "Credit Card",
      "description": "Vegetables, dairy, and pantry items"
    }
  }
  ```

#### 2. Get Expenses (With Search & Filter Query Parameters)
- **Method**: `GET`
- **Path**: `/expenses?search=groceries&category=Food&paymentMethod=Credit Card&startDate=2025-01-01&endDate=2025-12-31&sortBy=date-desc`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "6740b2e8d3f1a23456789def",
        "title": "Weekly Groceries",
        "amount": 75.5,
        "category": "Food",
        "date": "2025-05-15T00:00:00.000Z",
        "paymentMethod": "Credit Card",
        "description": "Vegetables, dairy, and pantry items"
      }
    ]
  }
  ```

#### 3. Get Dashboard Summary
- **Method**: `GET`
- **Path**: `/expenses/summary`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "totalAmount": 75.5,
      "totalCount": 1,
      "currentMonthSpending": 75.5,
      "currentMonthCount": 1,
      "categorySpending": [
        {
          "category": "Food",
          "total": 75.5,
          "count": 1
        }
      ],
      "paymentMethodSpending": [
        {
          "paymentMethod": "Credit Card",
          "total": 75.5,
          "count": 1
        }
      ],
      "recentExpenses": [ ... ]
    }
  }
  ```

#### 4. Get Expense By ID
- **Method**: `GET`
- **Path**: `/expenses/:id`
- **Response (200 OK)**

#### 5. Update Expense
- **Method**: `PUT`
- **Path**: `/expenses/:id`
- **Request Body**:
  ```json
  {
    "title": "Weekly Groceries & Snacks",
    "amount": 88.00,
    "category": "Food",
    "date": "2025-05-15",
    "paymentMethod": "Credit Card",
    "description": "Updated grocery list"
  }
  ```
- **Response (200 OK)**

#### 6. Delete Expense
- **Method**: `DELETE`
- **Path**: `/expenses/:id`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Expense deleted successfully"
  }
  ```
