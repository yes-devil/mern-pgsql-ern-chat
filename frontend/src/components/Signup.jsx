import React, { useState } from "react";
import { backendAuthAPI } from "../utils/backend-api";


export default function Signup(props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")

    // const 
    const handleSignUpSubmit =  async (e)=>{
        e.preventDefault()
        if(password !== cnfPassword){
            alert("Password and conform password is not same.")
            return
        }
        let result = await backendAuthAPI.post('/sign-up', {email : email, pass: password})
        // console.log(result)
        if(result.status){
            alert(result.data.message)
        }
        else{
            alert("Something went wrong. try after some time.")
        }
        
    }
    return (
        <>
            <form onSubmit={(e)=>{handleSignUpSubmit(e)}}>
                <input
                    type="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="email"
                     required
                 />
                <input
                    type="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder="create password"
                    required
                />
                <input
                    type="password"
                    value={cnfPassword}
                    onChange={(e)=>{setCnfPassword(e.target.value)}}
                    placeholder="conform password"
                    required />
                <input type="submit" value={"Verify"} />
            </form>
            <p>Registered user? <button onClick={()=>{props.setIsLogin(true)}}>Sign in</button></p>
        </>
    )
}