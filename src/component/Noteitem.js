import React,{useContext} from "react";
import noteContext from '../context/notes/noteContext';

const Noteitem=(props)=>{
    const context=useContext(noteContext);
    const{deleteNote}=context;
    const {note,updateNote}=props;
    return(
        <div className="div3 col-md-3 mx-1">
            <div className="card my-2">
            <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">Tag: {note.tag}</p>
            <div className="items">
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
            </div>
            </div>
        </div>
    )
}
export default Noteitem;