import React from "react";
import { useParams } from "react-router-dom";
import { backendAuthAPI } from "../utils/backend-api";

let AuthVerification = ()=>{
    const {token} = useParams()
    const verifyMe =async ()=>{
       let result = await backendAuthAPI.post("/verify-me", {token})
        if(result.status === 200){
            alert(result.data.message)
            location.href="/chat"
        }
        else if(result.status){
            alert(result.data.message)
            location.href= "/"
        }
        else{
            alert("Something went wrong. Try after sometime.")
        }
    }
    return (
        <>
            <button onClick={()=>verifyMe()}>Click to verify your email</button>
        </>
    )
}

export default AuthVerification