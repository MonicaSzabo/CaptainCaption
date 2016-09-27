// Include the Mongoose Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is Required"
  },
  email: {
  	type: String,
  	trim: true,
  	required: "Email is Required"
  },
  comments: {
  	type: String,
  	required: true,
  	required: "Comment is Required"
  }
});

// Create the Model
var Message = mongoose.model('Message', MessageSchema);

// Export it for use elsewhere
module.exports = Message;