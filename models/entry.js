var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
  entryName : String,
  entryType : String,
  entryDesc : String,
  entryLink : String
});

module.exports = mongoose.model( 'Entry', entrySchema );
