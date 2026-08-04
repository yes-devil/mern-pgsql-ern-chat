import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import { ContextBox, ChatBox } from "../utils/My-context";
import socket from "../utils/socket";
import { backendChatAPI } from "../utils/backend-api";
import { fetchChatHistory } from "../utils/chat-page-methods";
import "./css/chat-page.css"

const ChatPage = () => {
    let contextBox = useContext(ContextBox)
    let chatBox = useContext(ChatBox)
    // console.log("form chat page: ",context)
    useEffect(() => {




    }, [])

    return (
        <>
            <Header />
            <div className="chatPage" id="chatPage">
                <div id="leftPanel">
                    <h3>Chat Profiles</h3>
                    <form
                        className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Search"
                        />
                    </form>
                    <div id="profilesBox"></div>
                </div>
                <div id="rightPanel">
                    <div id="chatBoxHeading">
                        <img src="#" alt="img" />
                        <h3>profile name</h3>
                    </div>
                    <div id="chatBox">chatlogs</div>
                    <div id="chatInput">chat input box</div>
                </div>
            </div>
        </>
    )
}

export default ChatPage;