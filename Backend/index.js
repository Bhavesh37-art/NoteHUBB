const connectTomongo=require('./db');
const express=require("express");
var cors=require("cors");
const app=express();
const PORT=5000;
connectTomongo(); 
// app.use('/',(req,res)=>{  
//     res.send('This is home page !!')
// })
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

 
app.listen(PORT,()=>{
    console.log('Listening on PORT 3000 Successfully !!!')
})