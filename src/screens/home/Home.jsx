import Header from '../../components/Header.jsx';
import Notes from '../../components/Notes.jsx'; 
import AddNote from '../../components/AddNote.jsx'; 
import { useState, useEffect } from 'react';

function Home() {
  const [notes, setNotes] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:3001/notes') 
      .then(response => response.json())
      .then(data => {
        setNotes(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
      });
  }, []);

  return (
    <div>
      <Header title='My notes'></Header>
      <main>
        <Notes noteList={notes} setNotes={setNotes}></Notes> 
      </main>
      <aside>
        <AddNote setNotes={setNotes}></AddNote> 
      </aside>
    </div>
  )
}

export default Home;
