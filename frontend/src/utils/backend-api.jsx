import React from "react";
import axios from "axios";
import { config } from "dotenv";


const backendAuthAPI = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/auth",
    headers : {
        accept: "application/json",
        "Content-Type": "application/json"
    },
    withCredentials : true,
    validateStatus: (status)=> {return status <= 500}, //In this line axio will validate status regardless of status code that it was doing automatically before. status <= 500 means statuses upto 500 will be validated by axios and it will be my responsibility of mine to check the status and do what is necessary.
})

const backendChatAPI = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/chat",
    headers : {
        accept: "application/json",
        "Content-Type": "application/json"
    },
    withCredentials : true,
    validateStatus: (status) => {return status <= 500}, 
})

// console.log(import.meta.env.VITE_BACKEND_URL)

const fetchChats = ()=>{
    
}
export {backendAuthAPI, backendChatAPI}