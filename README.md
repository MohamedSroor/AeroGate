# AeroGate - Aviation IT System (RESTful API)

A robust, secure, and scalable backend system designed for managing flight schedules and authenticating aviation crew members. Built with a clean MVC architecture to ensure maintainability and high performance for critical operations.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose (ODM)
* **Security:** Bcrypt (Password Hashing) & JSON Web Tokens (JWT) for stateless authentication.
* **Validation:** Custom regex & `validator` library.

## Key Features
* **Clean Architecture:** Strictly follows the Model-View-Controller (MVC) pattern.
* **Role-Based Access:** Secures critical endpoints using custom JWT middleware.
* **Data Integrity:** Strict Mongoose schemas with default values and unique indexes to prevent data duplication.
* **Robust Error Handling:** Global error catching to prevent server crashes (500 Internal Errors) and provide clean client responses.

## Database Schemas
1. **User (Crew):** `name`, `email` (unique), `password` (hashed), `role` (default: 'Crew').
2. **Flight:** `flightNumber` (unique), `destination`, `departureTime`, `status` (default: 'Scheduled').

## API Endpoints Reference

### Authentication (Public)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new crew member (hashes password). |
| `POST` | `/auth/login` | Authenticate crew member and return a valid JWT. |

### Flight Management
| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/flights` | Public | Retrieve a list of all scheduled flights. |
| `POST` | `/flights` | **Protected** | Add a new flight to the system. |
| `PUT` | `/flights/:id` | **Protected** | Update an existing flight's details or status. |
| `DELETE` | `/flights/:id` | **Protected** | Cancel/Remove a flight from the database. |

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MohamedSroor/AeroGate.git

2. Navigate to the project directory:
    cd AeroGate

3. Install dependencies:
    npm install

4. Start the server:
    node aero.js

The server will start running on port 3000 and connect to the local MongoDB instance.
