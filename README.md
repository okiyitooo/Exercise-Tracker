# Exercise Tracker

This is a full-stack JavaScript exercise tracker application that allows users to create a user profile and track their exercise activities. It's built with Node.js, Express.js, and MongoDB.

**This project was inspired by the "Exercise Tracker" challenge on freeCodeCamp.**

## Features

*   **User Management:**
    *   Create new users with a username.
    *   Retrieve a list of all users.
*   **Exercise Tracking:**
    *   Add exercises to a user's log with a description, duration, and date.
    *   Retrieve a user's exercise log, including the number of exercises and details of each exercise (description, duration, date).
    *   Filter the exercise log by date range (from, to) and limit the number of results.

## API Endpoints

*   **POST /api/users:** Create a new user.
    *   Request body: `{ username: "your_username" }`
    *   Response: `{ username: "your_username", _id: "user_id" }`
*   **GET /api/users:** Get a list of all users.
    *   Response: `[{ username: "user1", _id: "user_id1" }, { username: "user2", _id: "user_id2" }, ...]`
*   **POST /api/users/:_id/exercises:** Add an exercise to a user.
    *   Request body: `{ description: "exercise_description", duration: exercise_duration_in_minutes, date: "yyyy-mm-dd" }` (date is optional)
    *   Response: User object with exercise fields added.
*   **GET /api/users/:_id/logs:** Get the exercise log for a user.
    *   Optional query parameters: `from`, `to`, `limit`
    *   Response: User object with a `count` property and a `log` array of exercise objects.

## Project Structure

*   `index.js`: Main server file.
*   `public/`: Static files (HTML, CSS, JavaScript for the frontend).
*   `views/`: HTML templates.
*   `.env`: Environment variables (MongoDB connection string, etc.).

## Installation and Setup

1.  Clone the repository: `git clone <repository_url>`
2.  Install dependencies: `npm install`
3.  Create a `.env` file and add your MongoDB connection string as `MONGO_URI`.
4.  Start the server: `npm start`

## Usage

1.  Access the app in your web browser.
2.  Use the provided forms to create a user, add exercises, and view the exercise log.

## Example Usage

**Create a user:**
