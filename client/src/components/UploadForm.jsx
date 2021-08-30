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
            console.log(filesUploaded.selectedFile.buffer)
            data.append('file', filesUploaded.selectedFile[x])
        }
        
        console.log(data)
        console.log('this is step 2')
        
        axios.post('http://localhost:8000/upload', data, {

        })
        .then(res => {console.log('this is axios post '+res.statusText)})
    }


    return (
        <div>
            <h1>Upload your files here</h1>
            <form className='note' action="">
                <input onChange={handleOnChange} type="file" multiple name='file'/>
                <textarea  name="text" id="" cols="20" placeholder="Description" rows="3">
                </textarea>
                <Zoom in={true}>
                <Fab onClick={handleOnClick} type='submit' aria-label='add'>
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