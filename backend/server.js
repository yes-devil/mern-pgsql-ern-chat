const express = require("express")
const app = express()
const server = require("http").createServer(app)
// const { METHODS } = require("http");
const { Server } = require("socket.io")
const authRoute = require("./Routes/auth")
const chatRoute = require("./Routes/chat")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const cookie = require("cookie")
const {verifyRefreshCookie} = require("./util-functions/jwt-manager")
const { createMessage } = require("./util-functions/db-methods")
require("dotenv").config()

app.use(cors({
    origin: ["http://localhost:5173"], // Replace with your frontend URL
    credentials: true,             // CRUCIAL: Allows cookies to be sent cross-origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'accept'],
}))
app.use(express.json())
app.use(cookieParser())

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], // Replace with your frontend URL
        credentials: true,             // CRUCIAL: Allows cookies to be sent cross-origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],

    }
});

const activeUsers = new Map() // This is good, map is better than object

app.use("/auth", authRoute.router)
app.use("/chat", chatRoute)


io.use(async (socket, next)=>{
    let cookies = await cookie.parse(socket.handshake.headers.cookie || "")
    let refreshToken = cookies.refreshToken
    if(!refreshToken) next(new Error("token not found"))
    console.log("from io.use ", cookies)
    if(refreshToken){
        let result = await verifyRefreshCookie(refreshToken)
        if(result){
            socket.user = result.email
            next()
        }
        else{
            next(new Error("socket Connection failed."))
        }
    }
})


io.on("connection", (socket) => {
    console.log("a user just connceted with socket id : ", socket.id)
    activeUsers.set(socket.user, socket.id)

    socket.on("private-message", async ({receiverId, message}) => {
        let result = await createMessage(socket.user, receiverId, message) //Add into database
        if(result){
            let receiverSocketID = await activeUsers.get(receiverId)
            if(receiverSocketID){
                io.to(receiverSocketID).emit("receive_message", {sender: socket.user, receiver: receiverId, message: message})
            }
        }
    })
})

PORT=process.env.BACKEND_PORT || 3001
server.listen(PORT, () => {
    console.log("localhost:" + PORT)
})