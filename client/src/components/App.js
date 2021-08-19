import React, {useState} from 'react';
import Header from './Header'
import Footer from './Footer'
import Notes from './Notes'
import notes from '../notes'
import Note from './Note'
import CreateArea from './CreateArea'
import UploadForm from './UploadForm'

function App(){

    // const [noteToAdd, setNodeToAdd] = useState({
    //     title:"",
    //     content:""
    // })
    const [allNotes, setAllNotes] = useState([...notes])
    
    function addNote(newNote){
        // setNodeToAdd(newNote)
        console.log('newNote')
        setAllNotes((prevValue)=>{
            return(
                [...prevValue, newNote]
            )
        })
    }

    function deleteNote(id){
        setAllNotes(
            (prevValue)=>(prevValue.filter((note, index) => index !== id))
        )
        
    }

    return (
        <div>
            <Header />
            <CreateArea 
                onAdd={addNote}
            />
            <Notes 
                notes={allNotes}
                onDelete={deleteNote}
            />
            <UploadForm />

            <Footer />
        </div> 
    )
};

export default App;