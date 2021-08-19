//import modules
require('dotenv/config')
const express = require ('express')
const multer = require ('multer')
const mongoose = require  ('mongoose')
const bodyParser = require ('body-parser')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

//express
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static('../client/public'))

//make express to listen on port other than React
let port = 5000
app.listen(port, ()=>console.log(`listening on port ${port}`))

//s3 initiation
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
    // region: process.env.AWS_REGION
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback){
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')

//Routs

app.get('/', (req, res)=>{
    res.send('All working')
})

app.post('/images', (req, res)=>{
    res.send('YAHOO')
})
app.post('/upload', upload, (req, res)=>{

    let myFile = req.file.originalname.split('.')
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data)=>{
        if(error){
            res.status(500).send(error)
        }
            res.status(200).send(data)
        
    })
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

