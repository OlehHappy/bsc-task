var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// connect to mongodb
mongoose.connect('mongodb://localhost/bsc-test'); //use once

var Note = new Schema({
      title: String,
      isEditing: Boolean
});

module.exports = mongoose.model('notes', Note);
