const express = require('express');
const fs = require('fs');
const path = require('path');
let db = require('./db/db.json');

//sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

//sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//sets up 
app.use("/assets", express.static('assets'));

//setting up route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')))


app.route('/api/notes')
    .get((req, res) => res.json(db))
    .post((req, res) => {
        console.log(req.body)


    })


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));