var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  sender : { type: String, required: true, trim: true },
  receiver : { type: String, required: true, trim: true },
  message : { type: String, required: true }
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
