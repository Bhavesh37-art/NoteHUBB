import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const[credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""})
  const onChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
const handleSubmit= async (e)=>{
    e.preventDefault();
    const{name,email,password}=credentials;
    const response=await fetch("http://localhost:5000/api/auth/CreateUser",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },body: JSON.stringify({name,email,password})
      });
      const json = await response.json();
      console.log(json)
      if (json.success){
        //save the auth token and redirect
        localStorage.setItem('token',json.authToken);
        navigate('/')
      }else{
        alert("User already Exists !!!")
      }
}
  return (
<>
<form className="container" onSubmit={handleSubmit}>
  <div className="container">
    <label htmlFor="name" style={{color:"white"}} className="form-label">Name</label>
    <input type="text" className="form-control" onChange={onChange} name="name" id="name"/>
  </div>
  <div className="container">
    <label htmlFor="email" style={{color:"white"}} className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="container">
    <label htmlFor="password" style={{color:"white"}} className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
  </div>
  <div className="container">
    <label htmlFor="cpassword" style={{color:"white"}} className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
  </div>
  <div className="container my-3">
  <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
</>
  )
}

export default Signup
