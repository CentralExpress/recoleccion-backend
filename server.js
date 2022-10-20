const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express();

// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(fileUpload());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

const corsOptions = {
    origin: 'https://reco.centralexpress.info/',
    methods: 'GET, POST, PUT',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content- Range'
};
app.options('/upload', cors(corsOptions));

 // file upload api
app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "Archivo no encontrado" })
    }
        // accessing the file
    const myFile = req.files.file as UploadedFile;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/../public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Ocurrió un error" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})

//start app 
const port = process.env.PORT || 4000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
); 