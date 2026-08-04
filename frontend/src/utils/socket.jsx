import { io } from "socket.io-client"

// console.log(import.meta.env.VITE_BACKEND_URL)
let socket =  io(import.meta.env.VITE_BACKEND_URL, {withCredentials : true, autoConnect:false})

socket.on("connect", ()=>{
    console.log("socket connected now with soket id : ", socket.id)
})

socket.on("connect_error", (err)=>{
    console.log("socket connection error: ", err)
})

socket.on("disconnect", (reason)=>{
    console.log("socet disconected : ", reason)
})

// export const connectSocket = ()=>{
//         console.log("before socket connection : ", socket.id)
//         socket.connect()
//         console.log("socket connection successful : ", socket.id)
//         return socket
// }

// export const disconnectSocket = ()=>{
//     socket.disconnect()
// }

export default socket