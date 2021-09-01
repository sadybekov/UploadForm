//import modules
// require('dotenv/config')
require ('dotenv').config()
const express = require ('express')
const multer = require ('multer')
const multerS3 = require ('multer-s3')
const mongoose = require  ('mongoose')
const bodyParser = require ('body-parser')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const cors = require('cors')

//express
const app = express()
app.use(cors())

//make express to listen on port other than React
let port = 8000
app.listen(port, ()=>console.log(`listening on port ${port}`))

console.log(require('dotenv').config())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// app.use(express.static('../client/public'))


//s3 initiation
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// const storage = multer.memoryStorage({
//     destination: function(req, file, callback){
//         callback(null, 'public')
//     }
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb( null, './public' )
    }, 
    filename: function (req, file, cb){
        cb( null, Date.now() + '-' + file.originalname )
    }
})

const upload = multer({storage: storage}).array('file')

app.post('/upload', function (req, res) {
    
    upload (req, res, function (err){
        console.log('buffer')
    // console.log(req.files[0].buffer)
    console.log('stream')
    console.log(req)
        if (err instanceof multer.MulterError){
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    return res.status(200).send(req.file)
    })
})

const uploadAWS = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'game-jam-2021', 
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
        key: function (req, file, cb){
            console.log(file)
            cb(null, 'Team1/' + file.originalname);
            // acl: 'public-read'
        }
    })
})
app.post('/uploadAWS', uploadAWS.array('file'), function (req, res){
    res.send('Uploaded ' + req.files.length + ' files')
    // res.send(req.file.location)
    // const fileToUpload = req.file
    // const fileName = fileToUpload.originalname
    // const params = {
    //     Bucket: process.env.AWS_BUCKET_NAME, 
    //     Key: `someTeam/${fileName}`,
    //     Body: JSON.stringify(data, null, 2)
    // }
    
    // s3.upload(params, function (s3Err, data){
    //     if (s3Err) throw s3Err
    //     console.log(`File uploaded successfully at ${data.Location}`)
    // })
})



// app.post('/upload', upload, (req, res)=>{

//     let myFile = req.file.originalname.split('.')
//     const fileType = myFile[myFile.length - 1]

//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `${uuid()}.${fileType}`,
//         Body: req.file.buffer
//     }

//     s3.upload(params, (error, data)=>{
//         if(error){
//             res.status(500).send(error)
//         }
//             res.status(200).send(data)
        
//     })
// })

app.get('/home', (req, res)=>{
    console.log('got the signal')
    res.json({
        name:'Test respond',
        age: 990    
    })
})




//Routs

app.get('/', (req, res)=>{
    res.send('All working')
})

app.post('/images', (req, res)=>{
    res.send('YAHOO')
})





// mongoose.connect("mongodb+srv://admin-ilyas:admin@cluster0.yj4em.mongodb.net/upload-form?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('we are connected')
// });

// let port = process.env.PORT;
// if (port == null || port == '') {
//     port = 3000
// }


// create schema
// const itemSchema = new mongoose.Schema(
//     {
//         title: String,
//         content: String
//     }
// )

// const Item = mongoose.model('Items', itemSchema)

// app.get('/', (req, res)=>{
//     Item.find((err, items)=>{
//         console.log(items)
//     })
//     res.render(items)
// })

