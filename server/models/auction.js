var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var AuctionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: [{ type: String, trim: true }],
  currently: { type: Number, required: true },
  buyPrice: { type: Number, default: null },
  firstBid: { type: Number, required: true },
  numberOfBids: { type: Number },
  bids: [
    {
      bidder: {
        username: { type: String, required: true },
        rating: { type: Number, required: true },
        id: { type: ObjectId, ref: 'User', required: true },
        location: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true }
      },
      time: { type: Date, default: Date.now },
      amount: { type: Number, required: true }
    }
  ],
  location: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  started: { type: Date, default: Date.now },
  ends: { type: Date},
  seller: {
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    id: { type: ObjectId, ref: 'User', required: true }
  },
  description: { type: String, trim: true }
});


var Auction = mongoose.model('Auction', AuctionSchema);
module.exports = Auction;
