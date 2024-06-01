# User Registration, Login, and Profile Management System

## Project Overview

This project is a full-fledged CRUD (Create, Read, Update, Delete) REST API built with Express.js, providing user registration, login, and profile management functionalities. The frontend is designed using HTML, CSS, and JavaScript to create a user-friendly interface for these operations.

## Features

- **User Registration**: Allows new users to register by providing their details and uploading a profile image.
- **User Login**: Authenticates users based on their email and password.
- **Profile Page**: Displays user information with options to edit the profile or delete the account.
- **Profile Management**: Enables users to update their profile information and upload a new profile image.
- **Logout**: Provides functionality for users to log out of their account.
- **Account Deletion**: Allows users to delete their account with confirmation.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine
- MySQL server running and accessible

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Install Backend Dependencies**

    ```bash
    cd backend
    npm install
    ```

3. **Configure MySQL Database**

    - Create a MySQL database.
    - Update the `database.js` file with your MySQL database credentials.

    ```javascript
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'your-username',
        password: 'your-password',
        database: 'your-database-name'
    });
    ```

4. **Run Backend Server**

    ```bash
    node index.js
    ```

5. **Setup Frontend**

    No additional setup is required for the frontend. Open the `index.html` file in your browser to start the application.

### API Endpoints

- **Registration**: `POST /api/register`
    - Registers a new user. Hashes the password before saving.
    - Request body should include: `firstname`, `lastname`, `gender`, `dob`, `email`, `password`, `profileImage`.

- **Login**: `POST /api/login`
    - Authenticates a user and returns a token.
    - Request body should include: `email`, `password`.

- **Get Profile**: `GET /api/profile`
    - Retrieves the logged-in user's profile information.

- **Update Profile**: `PUT /api/profile`
    - Updates the user's profile information.
    - Request body can include: `firstname`, `lastname`, `gender`, `dob`, `email`.

- **Delete Account**: `DELETE /api/profile`
    - Deletes the logged-in user's account.

- **Upload Profile Image**: `POST /api/profile/image`
    - Uploads and updates the user's profile image.
    - Request body should include: `profileImage`.

## Error Handling

- Frontend validation ensures all fields are filled correctly before submission.
- Backend responses include appropriate error messages for failed operations.
