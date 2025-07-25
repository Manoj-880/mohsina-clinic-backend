# Mohsina Clinic Backend

This repository contains the backend for the Mohsina Clinic application, built with Node.js and Express.js. It provides a robust API for managing patient records, doctor information, medical documents, and follow-up appointments.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Patient Management**: Create, read, update, and delete patient records.
- **Doctor Management**: Manage doctor profiles and associated information.
- **Document Management**: Upload, retrieve, and manage medical documents (e.g., prescriptions, reports).
- **Follow-up Scheduling**: Schedule and track patient follow-up appointments.
- **Authentication & Authorization**: Secure API endpoints (though specific implementation details would be in `middleware/verifyCall.js`).
- **Dashboard Analytics**: (Implied by `dashboardRoute.js` and `dashboardController.js`) Potentially provides aggregated data for clinic overview.

## Project Structure

The project follows a modular and organized structure to ensure maintainability and scalability:

```
.
├── controllers/          # Contains the business logic for handling requests
├── middleware/           # Custom Express middleware (e.g., authentication)
├── models/               # Mongoose schemas for database models
├── repos/                # Data access layer for interacting with the database
├── routes/               # Defines API endpoints and links to controllers
├── utilities/            # Helper functions and utilities (e.g., Cloudinary integration)
├── .gitignore            # Specifies intentionally untracked files to ignore
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Records the exact dependency tree
└── server.js             # Main application entry point
```

### Detailed Breakdown:

- **`controllers/`**: Each controller handles specific API requests, processes input, interacts with the `repos` layer, and sends back responses. Examples include `patientController.js`, `doctorController.js`, `documentController.js`, etc.
- **`middleware/`**: Contains `verifyCall.js`, likely responsible for authentication or request validation.
- **`models/`**: Defines the Mongoose schemas for your MongoDB database. You'll find `patientModel.js`, `doctorsModel.js`, `documentModel.js`, `healthRecordModel.js`, and `patientFollowupModel.js` here.
- **`repos/`**: This layer abstracts database interactions. Each `repo` file (e.g., `patientRepo.js`, `doctorsRepo.js`) contains functions for CRUD operations on its respective model.
- **`routes/`**: Defines the API routes for different resources. For example, `patientsRoutes.js` handles all patient-related API calls, `doctorsRoute.js` for doctors, and so on.
- **`utilities/`**: Includes `cloudinary.js` for image/file uploads and `constants.js` for application-wide constants.
- **`server.js`**: The main entry point of the application, where Express is initialized, middleware is configured, and routes are defined.

## Getting Started

To get a copy of the project up and running on your local machine for development and testing purposes, follow these steps.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (or access to a MongoDB Atlas cluster)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd mohsina-clinic-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory of the project and add the following environment variables. Replace the placeholder values with your actual credentials.

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   - `PORT`: The port on which the server will run.
   - `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/mohsina_clinic` or your MongoDB Atlas URI).
   - `JWT_SECRET`: A strong, random string used for signing JWTs.
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Your Cloudinary credentials for image/file uploads.

### Running the Application

To start the development server:

```bash
npm start
```

The server will typically run on `http://localhost:5000` (or the port you specified in your `.env` file).

## API Endpoints

This section will detail the available API endpoints, their methods, and expected request/response formats. (To be filled in with specific endpoint details as the project evolves).

# Authentication
- `POST /api/login`  
  Authenticate a user using email/mobile and password. Returns a JWT token.

# Patients
- `GET /api/patients` – Retrieve all patients.
- `GET /api/patients/:id` – Retrieve patient by ID.
- `GET /api/patients/mobile/:mobileNumber` – Get patient by mobile number.
- `POST /api/patients` – Create a new patient.
- `PUT /api/patients/:id` – Update a patient.
- `DELETE /api/patients/:id` – Delete a patient.

# Doctors
- `GET /api/doctors` – Retrieve all doctors.
- `GET /api/doctors/:id` – Retrieve a doctor by ID.
- `POST /api/doctors` – Create a new doctor.
- `PUT /api/doctors/:id` – Update a doctor.
- `PUT /api/doctors/password/:id` – Update doctor password.
- `DELETE /api/doctors/:id` – Delete a doctor.

# Documents
- `GET /api/documents` – Get all documents.
- `POST /api/documents` – Upload a new document.
- `DELETE /api/documents/:id` – Delete a document.

# Follow-Ups
- `GET /api/followups/:id` – Get follow-up data by patient ID.

# Dashboard
- `GET /api/dashboard` – Get aggregated clinic data.

## Database Schema

(This section would typically include diagrams or detailed descriptions of your MongoDB schemas, outlining fields, types, and relationships. For brevity, this is a placeholder.)

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/) (for MongoDB object modeling)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/) (for media management)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) (likely for password hashing)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (for authentication)
- [dotenv](https://www.npmjs.com/package/dotenv) (for environment variables)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (if you have one, otherwise specify your chosen license or state no license).
