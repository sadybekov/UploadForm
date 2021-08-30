import React, {useState, useEffect} from 'react';
import Header from './Header'
import Footer from './Footer'
import Notes from './Notes'
import notes from '../notes'
import Note from './Note'
import CreateArea from './CreateArea'
import UploadForm from './UploadForm'

function GetData(){
    const [data, setData] = useState({})

    useEffect(()=>{
        fetch('/home')
        .then(res => {
            console.log(res)
            console.log('res.json()')
            return (res.json())
        })
        .then(data => {
            console.log(data)
            setData(data)})
    }, [])

    return(
        <div>
            <div>{data.name}</div>
            <div>{data.age}</div>
        </div>
    )
}   

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
            {/* <CreateArea 
                onAdd={addNote}
            />
            <Notes 
                notes={allNotes}
                onDelete={deleteNote}
            /> */}
            <UploadForm />
            {/* <GetData /> */}
            <Footer />
        </div> 
    )
};

export default App;