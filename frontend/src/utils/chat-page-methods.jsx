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
        let result = await backendChatAPI.get(
            "/search-profile", 
            {
                params: {
                    profile : profileName
                }
            })
        if(result.status == 200){
            console(result.data.message)
            return result.data.resultList
        }
        else{
            console.log(result.data.message)
            return false
        }
    } catch (error) {
        return false
    }
}

// export {fetchChatHistory}
export const initiateChatPage = async ()=>{
    socket.connect()
    let chatHistory = await fetchChatHistory()

}