const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8080;
const dotenv = require('dotenv')
dotenv.config()

if (process.env.NODE_ENV != 'test'){
    var config = require('./config/db')
} else {
    var config = require('./config/db_test')
}

mongoose.Promise = global.Promise;

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (err) {
        console.log('Mongoose connection error: ' + err);
        process.exit(1)
    } else {
        console.log('Mongoose connection success at ' + config.db)
    }
})

const app = express();

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['authorization']
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV != 'test'){
    app.use(morgan('combined'))
}

app.use(cors(corsOption))

app.use('/static', express.static(path.resolve('./static')));

app.listen(port, function() {
    console.log('Listening on port ' + port);
});

app.get('/', function(req, res) {
    res.status(200).send("Hello This is Booboo the Tutor API")
})

const router = require('./routes')
app.use('/v1/', router)

process.on('SIGINT', function() {
    console.log("\nฺBye! Process is shutting down by SIGINT(Ctrl-C)");
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(1);
    });
});

module.exports = app