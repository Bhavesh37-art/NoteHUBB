const jwt=require('jsonwebtoken');
const JWT_Secret="Thisisthesecretsignaturetoken";


const fetchuser=(req,res,next)=>{ 
   // fet the user from the jwt token and add id to req object
   // fetchuser function is used to authenticate user a helps to get logged for whole time !!!
   const token=req.header('auth-token');
   if(!token){
    res.status(401).send({error:"Please authenticate using valid token"})
   }
   try{
    const data=jwt.verify(token,JWT_Secret)
    req.user =data.user;
     next()
   }catch(errro){
    res.status(401).send({error:"Please authenticate using valid token"})
   }
}

module.exports=fetchuser;