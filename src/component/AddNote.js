import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
  const context=useContext(noteContext);
  const{addNote}=context;

  const[note,setNote]=useState({title:"",description:"",tag:" "})
  const handleClick=(e)=>{ 
    // preventDefault is used to prevent reloading of page
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
<div className='container my-3'>
<h2 style={{color:"white"}}>Add Notes</h2>
<form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" style={{color:"white"}} className="form-label">Title</label>
    <input type="text" minLength={5} required className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" style={{color:"white"}} className="form-label">Description</label>
    <input type="text" minLength={5} required className="form-control" value={note.description} id="description" name='description' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" style={{color:"white"}} className="form-label">tag</label>
    <input type="text" minLength={5} required className="form-control" value={note.tag} id="tag" name='tag' onChange={onChange}/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
  )
}

export default AddNote;
