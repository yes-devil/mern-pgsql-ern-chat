# Objective
This project is just made for learning the fullstack development. I am Kirtiraj Panigrahy who developed this project with the help of the tech stack mentioned below;

# Tech Stack
A realtime chat system made with <br>
P : PostgreSQL <br>
E : Express.js <br>
R : Vite-React.js <br>
N : Node.js <br>


# Description
The system is limited to text messages and single chat system only.
Group chat is not allowed and same for file transfer.
Voice and Video call feature shall be included in future.

# Steps to run this project in your machine or repo
1. Run `$git clone https://github.com/yes-devil/mern-pgsql-ern-chat.git` in git bash.
It will clone and add files in your repo
2. Then add configuration secrets and credentials in `.env` files. Add `.env` file in both frontend and backend with the credentils gien below
```
IN the /backend/.env/
EMAIL='your email address (most likely gmail)'
EMAIL_APP_PASS="put actual app password"

jwt_ACCESS_TOKEN_SECRET=""
jwt_REFRESH_TOKEN_SECRET=""
jwt_REGD_TOKEN_SECRET=""

FRONTEND_DOMAIN="http://localhost:5173"

COCKROACH_DB_STRING="postgresql://user:<pass>@xxxxxxxxx.cockroachlabs.cloud:26257/chat-app?sslmode=verify-full"

BACKEND_PORT=3000
```
3. Start the server or backend: <br>
`$cd backend` <br>
`$npm ci` <br>
`$node server.js`

```
In the /frontend/.env
VITE_BACKEND_URL=http://localhost:3000
```
4. Start the frontend: <br>
`$cd frontend` <br>
`$npm ci` <br>
`$npm run dev`