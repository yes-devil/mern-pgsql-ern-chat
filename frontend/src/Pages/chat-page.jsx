import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { ContextBox, ChatBox } from "../utils/My-context";
import socket from "../utils/socket";
import { backendChatAPI } from "../utils/backend-api";
import { fetchChatHistory } from "../utils/chat-page-methods";
import "./css/chat-page.css"

const ChatPage = () => {
    let [chatInput, setChatInput] = useState("")
    let contextBox = useContext(ContextBox)
    let [messages, setMessages] = useState([])
    let [profiles, setProfiles] = useState([])
    // console.log("form chat page: ",context)
    const demoProfiles = [
        { id: 1, name: "John Doe", lastMessage: "Hey! How are you?" },
        { id: 2, name: "Emma Watson", lastMessage: "Let's meet tomorrow." },
        { id: 3, name: "Michael Scott", lastMessage: "That's what she said." },
        { id: 4, name: "Sarah Parker", lastMessage: "See you soon!" },
    ];

    const demoMessages = [
        { id: 1, sender: "other", text: "Hello 👋" },
        { id: 2, sender: "me", text: "Hi! How are you?" },
        { id: 3, sender: "other", text: "I'm doing great." },
        { id: 4, sender: "me", text: "Awesome 😄" },
    ];

    
    useEffect(() => {


setMessages(demoMessages)
    setProfiles(demoProfiles)

    }, [])

    return (
        <>
            {/* <Header /> */}
            <div id="chatpage">
                {/* Left Panel */}
                <div className="leftPanel">
                    <div className="searchContainer">
                        <input
                            type="text"
                            placeholder="Search or start new chat"
                            className="searchInput"
                        />
                    </div>

                    <div className="profileList">
                        {profiles.map((profile) => (
                            <div className="profileItem" key={profile.id}>
                                <div className="avatar">
                                    {profile.name.charAt(0)}
                                </div>

                                <div className="profileInfo">
                                    <div className="profileName">{profile.name}</div>
                                    <div className="lastMessage">
                                        {profile.lastMessage}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="rightPanel">
                    <div className="chatHeader">
                        <div className="avatar large">J</div>
                        <div className="chatName">John Doe</div>
                    </div>

                    <div className="chatLogs">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`message ${msg.sender === "me" ? "sent" : "received"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="chatInputArea">
                        <input
                            type="text"
                            placeholder="Type a message"
                            className="messageInput"
                        />

                        <button className="sendButton">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage;