var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var AuctionSchema = new mongoose.Schema({
  ItemID: { type: String, unique: true, required: true },
  Name: { type: String, required: true, trim: true },
  Category: [{ type: String, trim: true }],
  Currently: { type: Number, required: true },
  Buy_Price: { type: Number, default: null },
  First_Bid: { type: Number, required: true },
  Number_of_Bids: { type: Number, default: 0 },
  Bids: [
    {
      Bidder: {
        Rating: { type: Number, required: true },
        UserID: { type: ObjectId, ref: 'User', required: true },
        Location: { type: String, required: true, trim: true },
        Country: { type: String, required: true, trim: true }
      },
      Time: { type: Date, default: Date.now },
      Amount: { type: Number, required: true }
    }
  ],
  Location: { type: String, required: true, trim: true },
  Country: { type: String, required: true, trim: true },
  Started: { type: Date, default: Date.now },
  Ends: { type: Date, required: true },
  Seller: {
    Rating: { type: Number, required: true },
    UserID: { type: ObjectId, ref: 'User', required: true }
  },
  Description: { type: String, trim: true }
});

var Auction = mongoose.model('Auction', AuctionSchema);
module.exports = Auction;
