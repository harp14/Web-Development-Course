import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';


function CreateArea(props) {
  
  const [isExpanded, setExpanded] = useState(false);
  
  const [notes, setNotes] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setNotes(prevNote => {
      return {
        ...prevNote,
        [name]:value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(notes);
    setNotes({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expandNoteArea() {
    setExpanded(true);
  }
  
  return (
    <div>
      <form className="create-note">
        {isExpanded && 
        <input
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={notes.title}
        />}
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={notes.content}
          onClick={expandNoteArea}
        />
        <Zoom
          in={isExpanded ? true : false}
        >
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
