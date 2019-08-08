const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true},
  phoneNumber: { type: String, trim: true, required: true},
  address: { type: String, trim: true, required: true},
  location: { type: String, trim: true, required: true},
  afm: { type: String, trim: true, required: true},
  //active: Boolean,
  //created: { type: Date, default: Date.now },
  //lastLogin: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model('User', userSchema );
