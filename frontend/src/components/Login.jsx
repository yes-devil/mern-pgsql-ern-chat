import React, { useContext, useState } from "react";
import { backendAuthAPI } from "../utils/backend-api";
import { ContextBox } from "../utils/My-context";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let context = useContext(ContextBox)
    let navigate = useNavigate()

    const handleLoginSubmit = async (e)=>{
        e.preventDefault()
        let result = await backendAuthAPI.post("/log-in", {email: email, pass: password})
        if(result.status === 200){
            alert(result.data.message)
            context.setIsAuthenticated(true)
            context.setUserID(email)
            navigate("/chat")
        }
        else if(result.status){
            alert(result.data.message)
            // navigate("/") //no need to redirect
        }
        else{
            alert("something wennt wrong.")
            // navigate("/") //also no need to redirect
        }

    }

    return (
        <>
            <form onSubmit={(e)=>{handleLoginSubmit(e)}}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="email"
                    required />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder="password"
                    required />
                <input type="submit" value={"Login"} />
            </form>
            <p>New user? <button onClick={() => { props.setIsLogin(false) }}>Sign up</button></p>     
            <p>isAuthenticated : {context.isAuthenticated + ""}</p>       
        </>
    )
}