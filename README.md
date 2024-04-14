# Travel Diary Platform Backend API

## Overview

This project is a backend API for a Travel Diary Platform. It allows users to create, read, update, and delete travel diary entries. The API is built using Node.js, Express.js, and SQLite3 database. It demonstrates skill in building a RESTful API, and implementing user authentication using JWT.

## Technology Stack

- Node.js
- Express.js
- SQLite3

## Setup Instructions

1. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone https://github.com/Nampallyrohith/travel-dairy-API

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm.

    ```bash
    cd travel-dairy-platform
    npm install

3. **Database Setup**: Ensure you have SQLite3 installed on your machine. The database file travelDairy.db is included in the project directory. This file contains two tables: user and dairy.

4. **Start the Server**: Start the Express server by running the following command:

    ```bash
    nodemon server.js

5. **API Documentation**: The API will be running at http://localhost:3000/. Refer to the API documentation below for available endpoints and usage.


### API Documentation
#### User Endpoints
User Registration
 - URL: /register/
 - Method: POST
 - Request Body:
    ```json
    {
    "username": "rohit12",
    "password": "rohit@12",
    "name": "Rohit",
    "gender": "male"
    }

 - Description: Registers a new user with the provided details.
User Login

 - URL: /login/
 - Method: POST
 - Request Body:
    ```json
    {
    "username":"rohit12",
    "password":"rohit@12"
    }

 - Description: Logs in the user with the provided credentials and returns a JWT token for authentication.
#### Diary Entry Endpoints
Get All Diary Entries
 - URL: /user/places/
 - Method: GET
 - Authentication: Required
 - Description: Retrieves all diary entries.
Create New Diary Entry
 - URL: /user/places/id
 - Method: POST
 - Authentication: Required
 - Request Body:
    ```json
    {
    "id": "11",
    "title": "Qutub Minar",
    "date": "18/03/2024",
    "location":"Delhi",         "img":"https://hblimg.mmtcdn.com/content/hubble/img/delhi/mmt/activities/m_activities_delhi_qutab_minar_l_384_574.jpg"
    }
 - Description: Creates a new diary entry with the provided details.
Get Diary Entry by ID
 - URL: /user/places/:id/
 - Method: GET
 - Authentication: Required
 - Description: Retrieves details of a specific diary entry by ID.
Update Diary Entry
 - URL: /user/places/:id/
 - Method: PUT
 - Authentication: Required
 - Request Body:
    ```json
    {
    "date": "07/02/2024"
    }
 - Description: Updates the date of a specific diary entry by ID.
Delete Diary Entry
 - URL: /user/places/:id/
 - Method: DELETE
 - Authentication: Required
 - Description: Deletes a specific diary entry by ID.
### Additional Functionality
 - In addition to the basic CRUD operations for user registration, login, and diary entries, the API also includes the following functionality:

 - Check Existing ID: Before inserting a new diary entry, the API checks if the provided ID already exists in the database to avoid duplicates.

 - Get Details of Specific Place: Allows users to retrieve details of a specific diary entry by its ID.

 - Update Diary Entry: Allows users to update the date of a specific diary entry by its ID.

 - Delete Diary Entry: Allows users to delete a specific diary entry by its ID.

 - Use middleware for authentication to secure the API.


## **Note**
 - Download the extension REST client which is used to send http request