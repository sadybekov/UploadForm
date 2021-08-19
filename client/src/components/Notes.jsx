import React, {useState} from 'react';
// import notes from '../notes'
import Note from './Note'
import CreateArea from './CreateArea'

const Notes = (props) => {
    const notes = props.notes

// setAllNotes((prevValue)=>{
//     return ([...prevValue, props.noteToAdd])})

    return (

        notes.map((note,i)=>{
            return(
                <Note 
                    key={i}
                    id={i}
                    title={note.title}
                    content={note.content}
                    onDelete={props.onDelete}
                />
            )
        })
    )
}

export default Notes