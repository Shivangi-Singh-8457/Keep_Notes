import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./createArea";
import Service from "./Service"

function Home() {

  const [notes, setNotes]=useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Service.CheckLogin().then((response) => {if(response==="true"){setIsLoggedIn(true);console.log(isLoggedIn)}}).catch(error => console.log(error));
  })

  function func1(response)
  {
    console.log(response);
    setNotes(response);
  }

  useEffect(() => {
    if (isLoggedIn) {
      // Call your API here
      Service.GetNotes().then((response) => func1(response)).catch(error => console.log(error));
    }
    else
    {
      setNotes([]);
    }
  }, [isLoggedIn]);

  function func2(response)
  {
    console.log(response);
    setNotes(prevNotes=>{
      return [...prevNotes, response];
    });
  }

  // setNotes(response)
  function addNote(newNote){
    Service.SaveNotes(newNote).then((response) => func2(response)).catch(error => console.log(error));
  }

function func3(response){
  setNotes(prevNotes=>{
    return prevNotes.filter((noteItem)=>{
      return response !== noteItem._id;
    });
  });
}

  function deleteNote(id){
    console.log(id)
    Service.DeleteNotes(id).then((response) => func3(response)).catch(error => console.log(error));
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <CreateArea isLoggedIn={isLoggedIn} onAdd={addNote}/>
      {notes.map((noteItem)=>{
          return <Note 
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title} 
          content={noteItem.content}
          onDelete={deleteNote}
          />;
        }
      )}
      <Footer/>
    </div>
  );
}

export default Home;
