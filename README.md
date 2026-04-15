# 🎟️ Seat Booking API

A backend system for managing seat availability and booking with authentication, authorization, and conflict handling. Built using Node.js, Express, MongoDB, Mongoose, Joi, and Docker.

---

## ⚠️ Important

👉 This project is built on top of a **starter source code base**.
👉 You must **use the provided structure** and **extend it**, not build from scratch.

---

## 🐳 Docker Setup (Start Here)

### Run MongoDB using Docker

```bash
docker-compose up -d
```

### Docker Configuration

```yaml
version: "3.9"

services:
  mongodb:
    image: mongo:8.0
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: myapp
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## 🚀 Features

* 🔐 User Authentication (JWT + Cookies)
* 👤 Role-based Authorization
* 🎟️ Seat Listing & Booking
* ⚡ Conflict handling (prevent double booking)
* 🧱 Clean architecture (Controller → Service → Middleware)
* 🐳 Dockerized MongoDB

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Docker
* JWT (Access + Refresh Tokens)
* Joi (validation)

---

## 📁 Project Structure

```
src/
 ├── common/
 │   ├── config/
 │   ├── constants/
 │   ├── dto/
 │   ├── middleware/
 │   ├── utils/            # ApiError, JWT utils, etc.
 │
 ├── modules/
 │   ├── seats/
 │   │   ├── seats.controller.js
 │   │   ├── seats.service.js
 │   │   ├── seats.model.js
 │   │   ├── seats.router.js
 │   │   ├── seed.js
 │
 │   ├── user/
 │   │   ├── dto/
 │   │   ├── auth.controller.js
 │   │   ├── auth.service.js
 │   │   ├── auth.middleware.js
 │   │   ├── auth.model.js
 │
 ├── app.js
 ├── server.js

.env
.env.example
docker-compose.yml
package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. ⚙️ Environment Variables 👨‍💻(env)

Create `.env` file:

```PORT=5050;
NODE_ENV="DEVELOPMENT"
MONGODB_URI=mongodb://admin:password@localhost:27017/myapp?authSource=admin
JWT_ACCESS_SECRET = "chaicodealongstring"
JWT_ACCESS_EXPIRES_IN = "45m"       
JWT_REFRESH_SECRET = "somthingnewsecret"
JWT_REFRESH_EXPIRES_IN = "7d"   

# ranjann805_db_user
# BcHheixsbTAKvzz0




SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=841ee01e5d4464
SMTP_PASS=4044dea30525f6
SMTP_FROM_NAME=Ranjan NAYAK
SMTP_FROM_EMAIL=noreply@example.com


CLIENT_URL=http://localhost:5050

```

### 4. Start Server

```bash
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers
2. User logs in → receives:

   * `accessToken` (cookie)
   * `refreshToken` (cookie)
3. Cookies are automatically sent with requests (`credentials: include`)

---

## 📡 API Endpoints

### 🔑 Auth

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

---

### 🎟️ Seats

```http
GET /api/seats
POST /api/seats/:id
```

**Body:**

```json
{
  "name": "Ranjan"
}
```

---

## 🛡️ Middleware

### Authentication (`authonation`)

* Verifies JWT
* Reads token from cookie or header

### Authorization (`authorize`)

* Restricts access by role

---

## ⚠️ Error Handling

Custom `ApiError` system:

| Code | Meaning        |
| ---- | -------------- |
| 400  | Bad Request    |
| 401  | Unauthorized   |
| 403  | Forbidden      |
| 404  | Not Found      |
| 409  | Conflict       |
| 500  | Internal Error |

Example:

```js
throw ApiError.conflict("Seat already booked");
```

---

## 🔁 Booking Logic

* Only unbooked seats can be booked
* Atomic query:

```js
{ _id: id, isBooked: false }
```

* Prevents duplicate booking

Returns:

* `404` → seat not found
* `409` → already booked

---

## 🧪 Testing Tips

* Use Postman / Thunder Client
* Enable cookies (`withCredentials`)
* Check DevTools → Application → Cookies

---

## 📌 Key Concepts

* Cookie-based authentication
* Error propagation (throw → catch)
* Lean queries for performance
* Role-based access control

---

## 📈 Future Improvements

* Payment integration
* Seat selection UI
* Admin dashboard
* Rate limiting
* log out

---

## 👨‍💻 Author

Ranjan Kumar Nayak
