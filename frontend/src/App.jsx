import React from "react";
import AuthPage from "./Pages/auth-page";
import ChatPage from "./Pages/chat-page";
import SettingsPage from "./Pages/settings-page";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
// import Header from "./components/Header";
import AuthVerification from "./Pages/auth-verification";
import { ContextProviderFun, ChatBoxProviderFun } from "./utils/My-context";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <ContextProviderFun>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/chat" element={<ChatBoxProviderFun> <ChatPage /> </ChatBoxProviderFun>} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/auth/verification/:token" element={<AuthVerification />} />
            {/* <Route path="/:note" element={<h1>{useParams().note}</h1>} /> */}
          </Routes>
        </ContextProviderFun>
      </BrowserRouter>
    </>
  )
}

export default App;