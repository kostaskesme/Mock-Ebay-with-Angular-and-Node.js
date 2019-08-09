var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var AuctionSchema = new mongoose.Schema({
  ItemID: { type: String, unique: true, required: true },
  Name: { type: String, required: true, trim: true },
  Category: [{ type: String, trim: true }],
  Currently: { type: Number },
  First_Bid: { type: Number },
  Number_of_Bids: { type: Number },
  Bids: [
    {
      Bidder: {
        Rating: { type: Number, required: true },
        UserID: { type: ObjectId, ref: 'User', required: true },
        Location: { type: String, required: true, trim: true },
        Country: { type: String, required: true, trim: true }
      },
      Time: { type: Date, required: true },
      Amount: { type: Number, required: true }
    }
  ],
  Location: { type: String, required: true, trim: true },
  Country: { type: String, required: true, trim: true },
  Started: { type: Date, required: true },
  Ends: { type: Date, required: true },
  Seller: {
    Rating: { type: Number, required: true },
    UserID: { type: ObjectId, ref: 'User', required: true }
  },
  Description: { type: String, trim: true }
});

var Auction = mongoose.model('Auction', AuctionSchema);
module.exports = Auction;
