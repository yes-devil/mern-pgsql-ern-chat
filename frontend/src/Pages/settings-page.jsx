import React from "react";
// import { contextBox } from "../utils/My-context";
import { useContext } from "react";
import Header from "../components/Header";

const SettingsPage = ()=>{
    const {isAuthenticated, setIsAuthenticated} = useContext(contextBox)
    return(
        <>
        <Header />
            Settings page.
          {/* <button onClick={()=>{setIsAuthenticated(!isAuthenticated)}}>c</button> */}

        </>
    )
}


export default SettingsPage