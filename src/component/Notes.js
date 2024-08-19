import React,{useContext, useEffect,useRef,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem'; 
import AddNote from './AddNote'

 
const Notes=()=>{
    const navigate = useNavigate();
    const context=useContext(noteContext);
    const{notes,getNote,editNote}=context; 
    useEffect(()=>{
      if(localStorage.getItem('token')){
      getNote();
      }else{
        navigate('/login')
      }
    },[])
    const ref=useRef(null);
    const refclose=useRef(null);
    const updateNote=(currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id,etitle : currentNote.title,edescription : currentNote.description,etag : currentNote.tag})
    };
    const[note,setNote]=useState({etitle:"",edescription:"",etag:"Default"})
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
      };
      
    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }
    return(
<>
    <AddNote/>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" minLength={5} required className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" minLength={5} required className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='div2 row my-3'>
    <h2 style={{color:"white"}}>Your Notes</h2>
    <div className='container'>
    {notes.length===0 && 'NO Notes !!'}
    </div>
    {notes.map((note) =>{
        return <Noteitem key={note._id} updateNote={updateNote} note={note}/>;
    }

 )}
</div>
</>
    )
}

export default Notes;