import React from "react";
import "./css/ResultList.css"

const ResultList = ({user})=>{
    return <p className="searchList" id="user">{user}</p>
}

export default ResultList