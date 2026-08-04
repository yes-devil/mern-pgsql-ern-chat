import React, {useState, createContext, useEffect} from "react";

let ContextBox = createContext();
let ChatBox = createContext();

function ContextProviderFun({ children }){

/*
    const [isAuthenticated, setIsAuthenticated] = useState(async ()=>{
        let stored_authStatus = await sessionStorage.getItem("auth-status")
        console.log("showing from usestate function sotred_authstatus : ", stored_authStatus)
        if(stored_authStatus){
            return true
        }
        else{
            return false
        }
    })

    useEffect( ()=>{
        if(isAuthenticated){
            sessionStorage.setItem("auth-status", true)
        }
        else{
            sessionStorage.removeItem("auth-status")
        }
    },[isAuthenticated])

    console.log(isAuthenticated)

    if(isAuthenticated){
        sessionStorage.setItem("auth-status", "true")
    }
    else{
        sessionStorage.setItem("auth-status", "false")
    }
        console.log(isAuthenticated)

*/
    let [isAuthenticated, setIsAuthenticated] = useState(false)
    let [userID, setUserID] = useState("")
    return(
        <ContextBox.Provider value={{isAuthenticated, setIsAuthenticated, userID, setUserID}}>
            {children}
        </ContextBox.Provider>
    )
}


const ChatBoxProviderFun = ({children})=>{
    let [chatHistory, setChatHistory] = useState([])
    let [receiver, setReceiver] = useState("")
    
    return(
        <ChatBox.Provider value={{chatHistory, setChatHistory, receiver, setReceiver}}>
            {children}
        </ChatBox.Provider>
    )
}


export {ContextBox, ContextProviderFun, ChatBox, ChatBoxProviderFun}