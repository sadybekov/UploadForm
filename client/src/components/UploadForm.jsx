import React, {useState} from 'react'
import axios from 'axios'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom'

function UploadForm() {
    const [filesUploaded, setFilesUploaded] = useState({
        selectedFile: null
    })




    function handleOnChange(event){
        console.log(`uploaded the following`)
        console.log(event.target.files)
        setFilesUploaded({
            selectedFile: event.target.files,
            loaded: 0
        })
    }
    function handleOnClick(event) {
        event.preventDefault()
        console.log('submitted')
        const data = new FormData()
        for (let x = 0; x< filesUploaded.selectedFile.length; x++){
            data.append('file', filesUploaded.selectedFile[x])
        }
        
        console.log(data)
        console.log('this is step 2')
        
        axios.post('http://localhost:8000/upload', data, {

        })
        .then(res => {console.log('this is axios post '+res.statusText)})
    }

    function handleOnClickAWS(event) {
        event.preventDefault()
        console.log('submitted')
        console.log(event.target)
        const data = new FormData()
        for (let x = 0; x< filesUploaded.selectedFile.length; x++){
            console.log(filesUploaded.selectedFile.buffer)
            data.append('file', filesUploaded.selectedFile[x])
        }
        
        console.log(data)
        console.log('this is step 2')
        
        axios.post('http://localhost:8000/uploadAWS', data, {

        })
        .then(res => {console.log('this is axios post '+res.statusText)})
    }


    return (
        <div>
            <h1>Upload your files here</h1>
            <form className='note' action="">
                <label for="team">Team: </label>
                <input type="text" name='team' required/>
                <label for="game">Game: </label>
                <input type="text" name='game' required/>
                <label for="gameDescription">Game description: </label>
                {/* <textarea  name="team" id="" cols="20" placeholder="Team name" rows="1" required>
                </textarea>
                <textarea  name="game" id="" cols="20" placeholder="Game name" rows="3" required>
                </textarea> */}
                <textarea  name="gameDescription" id="" cols="20" placeholder="Game description" rows="3" required>
                </textarea>
            
                <input onChange={handleOnChange} type="file" multiple name='file'/>
                {/* <Zoom in={true}>
                <Fab onClick={handleOnClick} type='submit' aria-label='add'>
                    <AddIcon/>
                </Fab>
                </Zoom> */}
                <Zoom in={true}>
                <Fab onClick={handleOnClickAWS} type='submit' aria-label='add'>
                    <AddIcon/>
                </Fab>
                </Zoom>
            </form>
                {/* bootstrap */}
                {/* <div class="container">
                    <div class="row">
                    <div class="col-md-6">
                        <form method="post" action="#" id="#">
                        
                            
                            
                            
                            <div class="form-group files">
                                <label>Upload Your File </label>
                                <input type="file" class="form-control" multiple=""/>
                            </div>
                            
                            
                        </form>
                        
                        
                    </div>
                    <div class="col-md-6">
                        <form method="post" action="#" id="#">
                        
                            
                            
                            
                            <div class="form-group files color">
                                <label>Upload Your File </label>
                                <input type="file" class="form-control" multiple=""/>
                            </div>
                            
                            
                        </form>
                        
                        
                    </div>
                    </div>
                </div> */}
                {/* bootstrap */}

            
        </div>
    )
}

export default UploadForm