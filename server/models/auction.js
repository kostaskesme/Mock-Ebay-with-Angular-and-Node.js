var mongoose = require('mongoose');

var AuctionSchema = new mongoose.Schema({
  //item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', unique: true, required: true, trim: true},
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstBid: { type: Number, required: true },
  noOfBids: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, trim: true },
  currentBid: { type: Number, required: true },
  buyPrice: { type: Number, trim: true }
});

var Auction = mongoose.model('Auction', AuctionSchema);
module.exports = Auction;
