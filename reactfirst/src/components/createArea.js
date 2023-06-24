import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import Swal from 'sweetalert2';

function CreateArea(props){

    const [isExpanded, setExpanded]=useState(false);

    const [note, setNote]=useState({
        title: "",
        content: ""
    });
    
    function handleChange(event){
        const {name,value}=event.target;
        setNote(prevNote=>{
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function submitNote(event){
        if(props.isLoggedIn)
        {
            console.log(note);
            console.log(typeof(note));
            props.onAdd(note);
        }
           
        else
            Swal.fire('Hello!', 'To keep Notes login first');
        setNote({
            title: "",
            content: ""
        })
        event.preventDefault();
    }

    function expand(){
        if(props.isLoggedIn)
        {
            setExpanded(true);
        }
        else
        {
            Swal.fire('Hello!', 'To keep Notes login first');
        }
        
    }

    return (
        <div>
            <form className="create-note">
                {   
                    isExpanded && (<input 
                    name="title" 
                    onChange={handleChange} 
                    value={note.title} placeholder="Title"
                    />) 
                }
                <textarea 
                    onClick={expand}
                    name="content" 
                    onChange={handleChange} 
                    value={note.content}
                    placeholder="Take a note..." 
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}>
                <Fab onClick={submitNote}>
                    <AddIcon/>
                </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;