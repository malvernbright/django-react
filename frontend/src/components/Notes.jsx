import React from 'react'
import "../styles/Note.css"

export default function Notes({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
    return (
        <div className='note-container'>
            <div className='note-title'>{note.title}</div>
            <div className='note-content'>{note.content}</div>
            <div className='note-date'>Created at {formattedDate}</div>
            <hr />
            <button className='delete-button' onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    )
}
