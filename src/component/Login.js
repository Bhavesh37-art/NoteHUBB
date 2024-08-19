import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'

const Login=()=>{
    const[credentials,setcredentials]=useState({email:"",password:""})
    const navigate = useNavigate()
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
      }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST", 
            headers:{
              "Content-Type":"application/json"
            },body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json)
          if (json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            navigate('/')
          }else{
            alert("Invalid Credentials !!")
          }
    } 
    return(
<>
<form className="conatiner" onSubmit={handleSubmit}>
  <div className="container">
    <label htmlFor="email" style={{color:"white"}} className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="container">
    <label htmlFor="password" style={{color:"white"}} className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"/>
  </div>
  <div className="container my-3">
  <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
</>
    )
}

export default Login