import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpand, setExpand] = useState(false);

  useEffect(() => {
    if (props.editingNote) {
      setNote({
        title: props.editingNote.title,
        content: props.editingNote.content
      });
      setExpand(true);
    } else {
      setNote({
        title: "",
        content: ""
      });
    }
  }, [props.editingNote]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();

    if (props.editingNote) {
      props.onUpdate({ id: props.editingNote.id, ...note });
    } else {
      props.onAdd(note);
    }

    setNote({
      title: "",
      content: ""
    });
  
  }

  function expanded() {
    setExpand(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpand && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={expanded}
          onChange={handleChange}
          value={note.content}
          placeholder="Notes..."
          rows={isExpand ? 3 : 1}
        />
        <Zoom in={isExpand}>
        <button onClick={submitNote}>
            {props.editingNote ? "↑": "+"}
           
        </button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
