//create web server
const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

//connect to database
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

//post data to database
app.post('/api', (request, response) => {
    console.log('I got a request!');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});

//get data from database
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});