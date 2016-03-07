var mongoose = require('mongoose');
var Note = require('model');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    Note.find(function(err, results) {
        if (err) { console.log(err); }

        res.send({ notes: results });
    });
});

router.post('/', function(req, res) {
    var note = new Note(req.body);
    note.save(function(err) {
        if (err) { console.log(err); }

        res.send('Note saved');
    });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    Note.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { title: req.body.title }
    }, function(err) {
        if (err) { console.log(err); }

        res.send('Note updated');
    });
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Note.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) { console.log(err); }

        res.send('Note deleted');
    });
});

module.exports = router;
