import React, {useState} from "react";
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom'
import { TrendingUpRounded } from "@material-ui/icons";
// import {getNotes} from '../notes'

function CreateArea(props) {

  const [isExpanded, setIsExpanded] = useState(false)

  //stores value of the new note
  const [note, setNote] = useState({
    title:'',
    content:''
  });

  //handle change of new note inputs
  function handleChange(event){
    const {name, value} = event.target
    console.log('name is ' + name)
    setNote((prevValue)=>{
      return ({...prevValue, [name]: value})
    })
    console.log(note)
  }

  //handle submit of new note
  function handleClick(event) {
    event.preventDefault()
    // getNotes(note)
    props.onAdd(note)
    console.log(note)
    setNote({
      title:'',
      content:''
    })
    setIsExpanded(false)
  }

  function expand(){
    setIsExpanded(true)
  }
  
  return (
    <div>
      <form className='create-note'>
        {isExpanded && <input onChange={handleChange} name="title" placeholder="Task" value={note.title}/>} 
        <textarea onClick={expand} onChange={handleChange} name="content" placeholder="Task description..." rows={isExpanded ? 3 : 1} value={note.content}/>
        <Zoom in={true}>
          <Fab onClick={handleClick} type='submit' aria-label='add'>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
// export {newNotes}
