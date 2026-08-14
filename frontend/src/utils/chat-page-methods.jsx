import React from "react";
import { backendAuthAPI, backendChatAPI } from "./backend-api";
import socket from "./socket";

export const fetchChatHistory = async ()=>{
    try {
        let result = await backendChatAPI.get("/get-all-chats")
        if(result.status == 200){
            console.log(result.data.chats)
            alert(result.data.message)
            return result.data.chats
        }
        else if(result.status == 404){
            console.log(result.data)
            alert(result.data.message)
            return 

        }
        else{
            return false
        }
    } catch (error) {
        console.log("failed to fetch chat history ", error)
    }
}

export const searchProfile = async (profileName)=>{
    try {
        console.log("in api calling part: ", profileName)
        let result = await backendChatAPI.get(
            "/search-profile", 
            {
                params: {
                    profile : profileName
                }
            })
            console.log("Result is ", result)
        if(result.status == 200){
            console.log(result.data.message)
            console.log(result.data.resultList)

            return result.data.resultList
        }
        else{
            console.log(result.data.message)
            return [result.data.message]
        }
    } catch (error) {
        return false
    }
}

export const fetchAllProfiles = ()=>{
    try {
        
    } catch (error) {
        
    }
}

export const enableChat = async ()=>{
    await socket.connect()
}