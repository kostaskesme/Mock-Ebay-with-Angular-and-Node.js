var mongoose = require('mongoose');
// var users = require('./users.js');

var AuctionSchema = new mongoose.Schema({
  //items: { type: , unique: true, required: true, trim: true},
  // seller: [{ type: Schema.users.UsersSchema.ObjectId, ref: 'User', required: true }], // [] ??
  firstBid: { type: Number, required: true },
  noOfBids: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, trim: true },
  currentBid: { type: Number, required: true },
  buyPrice: { type: Number, trim: true }
});

var Auction = mongoose.model('Auction', AuctionSchema);
module.exports = Auction;
