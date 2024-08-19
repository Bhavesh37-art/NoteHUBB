 import React,{useState} from "react";
 import noteContext from "./noteContext";

 const NoteState=(props)=>{
  const host="http://localhost:5000"
    const noteInitial=[]
      const[notes,setNotes]=useState(noteInitial)

      // get all notes :-
      const getNote= async ()=>{
        // Api call
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const json = await response.json();
        setNotes(json)
      }
      // AddNote:-
      const addNote= async (title,description,tag)=>{
        // TODO: api call:-
        const response=await fetch(`${host}/api/notes/addnote`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
          },body: JSON.stringify({title,description,tag})
        });

        // logic to add note in client side :-
        const note = await response.json(); 
        setNotes(notes.concat(note));
      }
      // DeleteNote:-
      const deleteNote= async (id)=>{
        // TODO: api call
        const response=await fetch(`${host}/api/notes/deleteNote/${id}`,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
          }
        });
        const json =await response.json();
        // logic to delete in client side:-
        const Newnotes=notes.filter((note)=>{return note._id!=id});
        setNotes(Newnotes);
      }
      // EditNote:-
      const editNote= async (id,title,description,tag)=>{
        // Api call
        const response=await fetch(`${host}/api/notes/updateNote/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem('token')
          },body: JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        // logic to edit note in client side:-
        let newNote=JSON.parse(JSON.stringify(notes))
        for(let i=0;i<newNote.length;i++){
          const element=newNote[i];
          if (element._id===id){
            newNote[i].title=title;
            newNote[i].description=description;
            newNote[i].tag=tag;
            break;
          }
        }
        setNotes(newNote);
      }

    return(
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </noteContext.Provider>
    )
 }
 export default NoteState;