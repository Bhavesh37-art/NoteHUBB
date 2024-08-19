import React from "react";

const Alert=(props)=>{
return(
    <div>
        <div className="alert alert-primary" style={{backgroundColor:"rgb(228, 77, 77)"}} role="alert">
        {props.message}
        </div>
    </div>
)
}
export default Alert;