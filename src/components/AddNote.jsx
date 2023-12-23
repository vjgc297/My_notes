import React, { useState, useEffect } from 'react';

function AddNote({ setNotes }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    // Get the current date in the format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Set the minimum date to today
    setMinDate(today);
  }, []);

  const createNote = () => {
    fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, content }),
    })
      .then(response => response.json())
      .then(newNote => {
        setNotes(prevNotes => [...prevNotes, newNote]);
        setTitle('');
        setDate('');
        setContent('');
      })
      .catch(error => {
        console.error('Error creating note:', error);
      });
  }

  return (
    <form>
      <input
        placeholder='Title'
        onChange={e => setTitle(e.target.value)}
        value={title}
      />
      <input
        type='date'
        min={minDate}
        max="2037-12-31"
        onChange={e => setDate(e.target.value)}
        value={date}
      />
      <textarea
        placeholder='Content'
        rows={5}
        onChange={e => setContent(e.target.value)}
        value={content}
      />
      <button type='button' onClick={createNote}>Add</button>
    </form>
  );
}

export default AddNote;
