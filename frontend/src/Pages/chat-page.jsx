import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import { ContextBox, ChatBox } from "../utils/My-context";
import socket from "../utils/socket";
import { backendChatAPI } from "../utils/backend-api";
import { fetchChatHistory } from "../utils/chat-page-methods";

const ChatPage = () => {
    let contextBox = useContext(ContextBox)
    let chatBox = useContext(ChatBox)
    // console.log("form chat page: ",context)
    useEffect( ()=>{
        
        
        
        
    },[])

    return (
        <>
            <Header />
            <div className="chatPage" id="chatPage">
                <div id="leftPanel">
                    <h3>Chat Profiles</h3>
                    <div id="profileBox"></div>
                </div>
                <div id="rightPanel">
                    <div id="chatBoxHeading"></div>
                    <div id="chatBox"></div>
                    <div id="chatInput"></div>
                </div>
            </div>
        </>
    )
}

export default ChatPage;