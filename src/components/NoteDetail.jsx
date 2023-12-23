import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../screens/home/Home.module.css';

function NoteDetail() {
    const { id } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/notes/${id}`)
            .then(response => response.json())
            .then(data => {
                setNote(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    if (!note) {
        return <div>Note not found</div>;
    }

    return (
        <div className={styles.noteContainer}>
            <div className={styles.noteInfo}>
                <h2>{note.title}</h2>
                <br></br>
                <p>{note.date}</p>
                <br></br>
                <p>{note.content}</p>
            </div>
        </div>
    );
}

export default NoteDetail;
