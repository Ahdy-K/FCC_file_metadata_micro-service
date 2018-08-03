'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer')
// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});
// configuring multer
const storage = multer.memoryStorage()
let upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 5000000
}
}).single('upfile')
// handling File Upload
app.post('/api/fileanalyse',(req, res)=>{
  upload(req, res, (err)=>{
    if(err){
      return res.json(err)
    }else{
      res.json({
        'file name': req.file.originalname,
        'size':req.file.size
      })
    }
  })
  
 })



app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
