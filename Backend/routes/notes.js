const express=require('express');
const router=express.Router();
const fetchuser=require("../middleware/fetchUser")
const Notes= require('../models/Notes');
const { body ,validationResult}=require('express-validator');  

// Route 1:- get all the notes GET request Login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
        const notes= await Notes.find({user:req.user.id});
        res.json(notes)
    }catch(error){
        console.error("Database error:", error.message);
        res.status(500).send("Internal error occurred");
    }

});

// Route 2:- Add new notes POST request Login required
router.post('/addnote',fetchuser,[
    body('title','enter a valid title').isLength({ min: 3 }),
    body('description','description cannot be blank !!').isLength({ min: 5 })
],async (req,res)=>{
    try{
        const {title,description,tag}=req.body;
        // if any error occurs give the error back
            const errors=validationResult(req);
            if(!errors.isEmpty()){
              return res.status(400).json({error:errors.array()});
        }
            const note=new Notes({
            title,description,tag,user:req.user.id
            })
            const SavedNotes= await note.save()
            res.json(SavedNotes)
    }catch(error){
        console.error("Database error:", error.message);
        res.status(500).send("Internal error occurred");
    };


});

// Route 3:- Update  notes PUT request Login required
router.put('/updateNote/:id',fetchuser,[
    body('title','enter a valid title').isLength({ min: 3 }),
    body('description','description cannot be blank !!').isLength({ min: 5 })
],async (req,res)=>{

    try{
    const {title,description,tag}=req.body;
    // create a new note object:-
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    // find the note to be updated and update it:-
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}
    if(note.user.toString() !==req.user.id){
        return res.status(40).send("Not Allowed !!");
    }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
    }catch(error){
        console.error("Database error:", error.message);
        res.status(500).send("Internal error occurred");
    };
    
});

// Route 4:- delete  notes DELETE request Login required
router.delete('/deleteNote/:id',fetchuser,[
    body('title','enter a valid title').isLength({ min: 3 }),
    body('description','description cannot be blank !!').isLength({ min: 5 })
],async (req,res)=>{

    try{
    // find the note to be deleted and delete it:-
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}
    // allow deletion only if user own this note:-
    if(note.user.toString() !==req.user.id){
        return res.status(40).send("Not Allowed !!");
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note deleted Succesfully !!",note:note});
    }catch(error){
        console.error("Database error:", error.message);
        res.status(500).send("Internal error occurred");
    };
});

module.exports=router; 