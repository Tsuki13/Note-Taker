const express = require('express');
const fs = require('fs');
const path = require('path');

//sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

//sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//set path to assets
app.use("/assets", express.static('assets'));

//setting up route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')))

let notes = [];
let count = 0;

app.get('/api/notes', (req, res) => res.json(notes))
app.post('/api/notes', (req, res) => {
    console.log(req.body)
    let note = req.body
    count++
    note.id = count
    notes.push(note);
    console.log(notes)
    res.json(notes);
})

app.delete('/api/notes/:id', (req, res) => {
    let selected = req.params.id;

    for (const note of notes) {

        if (parseInt(selected) === note.id) {
            notes.splice(notes.indexOf(note), 1)
            res.json(notes)
        }
    }
})


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));