# Form Submission Backend

This is the backend for the form submission app. It is a Node.js app that uses Express.js and MongoDB.

## Setup

1. Clone the repository

```bash
git clone <repo-url>
```

2. Install the dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```bash
MONGODB_URI=<mongodb-connection-string>
DB_NAME=<database-name>
DB_COLLECTION=<collection-name>
```

4. Start the server

```bash
npm start
```

## API

### POST /form

This endpoint is used to submit the form data.

#### Request Body

```json
{
    "name": "Saurav Hathi",
    "email": "xyz@gmail.com",
    "message": "Hello World"
}
```

#### Response

```json
{
    "message": "Successfully submitted"
}
```