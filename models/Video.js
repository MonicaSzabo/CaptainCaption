// Include the Mongoose Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VideoSchema = new Schema({
  url: {
    type: String,
    trim: true,
    required: "URL is Required"
  },
  title: {
  	type: String,
    trim: true,
  	required: "Title is Required"
  },
  description: {
    type: String,
    trim: true,
    required: "Description is Required"
  },
  thumbnail: {
  	type: String,
  	trim: true,
  	required: "Thumbnail is Required"
  },
  userID: {
    type: String,
    trim: true,
    required: "UserID is Required"
  }
});

// Create the Model
var Video = mongoose.model('Video', VideoSchema);

// Export it for use elsewhere
module.exports = Video;