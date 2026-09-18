# Student Notes CRUD Micro-App

MERN Stack Lab Activity — Full-Stack Cloud Architectures

## Student Details

- Name: Amaan Ahmad
- Student ID: 2026201032
- GitHub Repository: https://github.com/amaan070/mern-notes-app

## Architecture

React (Vite) → Axios → Express REST API → Mongoose → MongoDB

- React client: `http://localhost:5173`
- Express server: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017/notes_db`

## Requirements

- Node.js 18+
- npm
- MongoDB running locally

## Setup

### 1. Start MongoDB

Make sure your local MongoDB daemon is running.

The application connects to:

```text
mongodb://localhost:27017/notes_db
```

### 2. Install and start the backend

Open a terminal:

```bash
cd notes-app/server
npm install
npm start
```

The API should be available at:

```text
http://localhost:5000
```

### 3. Install and start the frontend

Open a second terminal:

```bash
cd notes-app/client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## REST API

### Create a note

```http
POST /api/notes
Content-Type: application/json

{
  "title": "DBMS Revision",
  "content": "Study normalization and indexing."
}
```

Returns HTTP `201 Created`.

### Get all notes

```http
GET /api/notes
```

Notes are returned in descending `createdAt` order.

### Delete a note

```http
DELETE /api/notes/:id
```

Returns HTTP `200 OK` when the note is deleted and `404 Not Found` if it does not exist.

## Testing the API

Before testing the React UI, verify the three endpoints using Postman, Thunder Client, or curl.

Example:

```bash
curl -X POST http://localhost:5000/api/notes ^
  -H "Content-Type: application/json" ^
  -d "{"title":"Test Note","content":"Testing the API"}"
```

Then:

```bash
curl http://localhost:5000/api/notes
```

Use the returned `_id` for:

```bash
curl -X DELETE http://localhost:5000/api/notes/NOTE_ID
```

On Linux/macOS, replace the Windows `^` line continuation with `\`.

## Screenshots

The lab requires two runtime screenshots:

1. `screenshots/ui-preview.png` — browser showing at least two notes.
2. `screenshots/delete-action.png` — browser after deleting a note, with DevTools Network showing a successful `DELETE /api/notes/:id` request.

These must be captured after running the application. Do not submit fabricated screenshots as proof of runtime behavior.

## Submission

Do not include either `server/node_modules/` or `client/node_modules/` in the ZIP.

Recommended structure:

```text
notes-app/
├── .gitignore
├── README.md
├── screenshots/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── noteRoutes.js
│   ├── package.json
│   └── server.js
└── client/
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```
