const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const https = require("https");

const app = express();

// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

// file upload api
app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "Archivo no encontrado" })
    }
        // accessing the file
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Ocurrió un error" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})


/* app.listen(3000, () => {
    console.log('server is running at port 3000');
})
 */
https
  .createServer(app)
  .listen(4000, ()=>{
    console.log('server is runing at port 3000')
  });