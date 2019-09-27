var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true,  required: true, trim: true },
  firstName: { type: String, trim: true,  required: true },
  lastName: { type: String, trim: true,  required: true },
  phoneNumber: { type: String, trim: true,  required: true },
  address: { type: String, trim: true,  required: true },
  location: { type: String, trim: true,  required: true },
  country: { type: String, trim: true,  required: false },
  afm: { type: String, trim: true,  required: true },
  rating: { type: Number,  required: true },
  type: { type: Number,  required: true },
  approved: { type: Boolean,  required: true }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
