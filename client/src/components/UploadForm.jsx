import React, {useState} from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom'

function UploadForm() {
    function upload(event){
        console.log('uploaded')
    }
    function handleClick(event) {
        console.log('submitted')
    }
    return (
        <div>
            <form className='note' action="">
                <input onChange={upload} type="file" />
                <textarea name="" id="" cols="20" placeholder="Description" rows="3">
                </textarea>
                <Zoom in={true}>
                <Fab onClick={handleClick} type='submit' aria-label='add'>
                    <AddIcon/>
                </Fab>
                </Zoom>
            </form>
        </div>
    )
}

export default UploadForm