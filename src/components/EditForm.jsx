import React, { useState, useEffect } from 'react';

function EditForm({ editedNote, setEditedNote, onSave, onCancel }) {
  const handleSave = () => {
    fetch(`http://localhost:3001/notes/${editedNote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedNote),
    })
      .then(() => {
        onSave();
        onCancel();
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
  };

  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    // Get the current date in the format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Set the minimum date to today
    setMinDate(today);
  }, []);

  return (
    <form>
      <input
        placeholder='Title'
        value={editedNote.title}
        onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
      />
      <input
        type='date'
        min={minDate}
        max='2037-12-31'
        placeholder='Date'
        value={editedNote.date}
        onChange={(e) => setEditedNote({ ...editedNote, date: e.target.value })}
      />
      <textarea
        placeholder='Content'
        rows={7}
        value={editedNote.content}
        onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditForm;
