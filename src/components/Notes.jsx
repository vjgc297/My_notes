import React, { useState } from 'react';
import styles from '../screens/home/Home.module.css';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import EditForm from './EditForm';
import { useNavigate } from 'react-router-dom';

function Notes({ noteList, setNotes }) {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNote, setEditedNote] = useState({
    id: null,
    title: '',
    date: '',
    content: '',
  });

  const notes = noteList;
  const navigate = useNavigate();

  const handleNoteClick = (id) => {
    navigate(`/note/${id}`);
  };

  const handleDeleteNote = (id) => {
    fetch(`http://localhost:3001/notes/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  if (notes.length === 0) {
    return (
      <div className={styles.note}>
        <h3>Sorry! It seems there are no notes.</h3>
      </div>
    );
  }

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setEditedNote({
      id: note.id,
      title: note.title,
      date: note.date,
      content: note.content,
    });
  };

  const handleSaveEdit = (noteId) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? editedNote : note
    );
    setNotes(updatedNotes);
    setEditingNoteId(null);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
  };

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} className={styles.note}>
          <AiFillDelete
            className={styles.delete}
            onClick={() => handleDeleteNote(note.id)}
          ></AiFillDelete>
          <AiTwotoneEdit
            className={styles.edit}
            onClick={() => handleEditNote(note)}
          ></AiTwotoneEdit>
          {editingNoteId === note.id ? (
            // Display the edit form
            <EditForm
              editedNote={editedNote}
              setEditedNote={setEditedNote}
              onSave={() => handleSaveEdit(note.id)}
              onCancel={() => handleCancelEdit()}
            />
          ) : (

            <div>
              <h2>{note.title}</h2>
              <p>{note.date}</p>
              <p>{note.content.substring(0, 80)}...</p>
              <button onClick={() => handleNoteClick(note.id)}>Read more</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notes;
