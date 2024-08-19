// installed express,express-validator,installed bcryptjs,jsonwebtoken
const express=require('express');
const router=express.Router();
const User= require('../models/User');
const { body ,validationResult}=require('express-validator');  
const fetchuser=require("../middleware/fetchUser")
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const JWT_Secret="Thisisthesecretsignaturetoken";
// Route 1: api/auth/CreateUser 
// Create a User Don't require logged in !!! GET "/api/auth":-

    // [] this is only used to validate the name email and password to be Correct nothing more  :-
router.post('/CreateUser',[
    body('name').isLength({ min: 3 }),
    body('email','Enter a Vaild Email !!').isEmail(), 
    body('password','password cannot be blank !!').isLength({ min: 5 })
],async (req,res)=>{
    // res.send('This is Authentication page !!! ');
// Below 3-4 Lines of code Doesn't mean anything you can delete those but if error occurs plz Rewrite it again :- 
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        let success=false;
        return res.status(400).json({success,error:errors.array()});
    }
// Used try and catch method to prevent any error :- 
    try{
    // To check wether user already exists or not:-
    let user= await User.findOne({email:req.body.email})
    if(user){
        let success=false;
        return res.status(400).json({success,error:"User with this Email Already exists !!!"})
    }
    // Create a salt and use Hash and generate a password :-  
    // Creating a User Having name,email,password :-
    // .then.catch is used to show the user created info and catch any error while creating a user like invalid email or limt of passord id eg. 5 :-
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);
    user= await User.create({
        name :req.body.name,
        email :req.body.email,
        password :secPass,
    }) 
    .catch(err=>{console.log(err); res.json({error:'please enter a unique value', message:err.message})});
    const data={user:{id:user.id}}
    const authToken=jwt.sign(data,JWT_Secret)
    let success=true;
    res.json({success,authToken})
    // res.json({"nice":"nice"}) 
    //  catch is used to catch a unknown error occured during this - for safety:-
    }catch(error){ 
    console.error(error.message);
    res.status(500).send("Some error Occured")
    }
}) 

// Route 2: api/auth/login
// Authenticate a User Don't require logged in !!! POST "/api/auth/login":-

router.post('/login', [
  body('email', 'Enter a Valid Email !!').isEmail(),
  body('password', 'Password cannot be blank !!').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      let success=false;
      return res.status(400).json({ success,error: "Invalid credentials" });
    }

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, JWT_Secret);
    let success=true;
    res.json({ success,authToken });
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).send("Internal error occurred");
  }
});

// Route 3: api/auth/getUser
// Get loggedin USer Details using :Post 
router.post('/getUser',fetchuser,async (req, res) => {

    try{
        let userID=req.user.id
        const user=await User.findById(userID).select("-password");
        res.send(user)
    }catch(error){
        console.error("Database error:", error.message);
        res.status(500).send("Internal error occurred");
    }


})


module.exports=router