var Auction = require('../models/auction');

exports.createAuction = function (req, res) {
  var auctionFromRequest = new Auction(req.body);
  auctionFromRequest.save().then(AuctionFromdb => {
    res.status(200).json({ created: true, auctionId: AuctionFromdb._id });
  })
  .catch(err => {
    res.status(400).send({ created: false, message: 'Error' });
    console.log(err);
  });
}

exports.getAuctionById = function (req, res) {
    Auction.findById(req.params.id, (err, auction) => {
        if (err){
            res.status(400).send({ found: false, message: 'Auction not found' });
            console.log(err);
        }
        else {
            res.status(200).json({ found: true, Auction: auction });
        }
    });

}

exports.getAllAuctions = function (req, res) {
    Auction.find((err, auctionList) => {
        if (err) {
            res.status(400).send({ found: false, message: 'Auction not found' });
            console.log(err);
        }
        else
            res.status(200).json({ found: true, result: auctionList });
    });
}

exports.updateAuctionById = function (req, res) {
  Auction.findById(req.params.id, (err, auction) => {
    if (!auction) {
      res.status(400).send({ error: `Auction with id:${req.params.id} not found!`});
      console.log(err);
    }
    else {
      auction.ItemID = req.body.ItemID;
      auction.Name = req.body.Name;
      auction.Category = req.body.Category;
      auction.Currently = req.body.Currently;
      auction.First_Bid = req.body.First_Bid;
      auction.Number_of_Bids = req.body.Number_of_Bids;
      for (var i = 0; i < auction.Number_of_Bids; i++) {
        auction.Bids[i].Bidder.Rating = req.body.Bids.Bidder.Rating;
        auction.Bids[i].Bidder.UserID = req.body.Bids.Bidder.UserID;
        auction.Bids[i].Bidder.Location = req.body.Bids.Bidder.Location;
        auction.Bids[i].Bidder.Country = req.body.Bids.Bidder.Country;
        auction.Bids[i].Time = req.body.Bids.Time;
        auction.Bids[i].Amount = req.body.Bids.Amount;
      }
      auction.Location = req.body.Location;
      auction.Country = req.body.Country;
      auction.Started = req.body.Started;
      auction.Ends = req.body.Ends;
      auction.Seller.Rating = req.body.Seller.Rating;
      auction.Seller.UserID = req.body.Seller.UserID;
      auction.Description = req.body.Description;

      auction.save().then(auction => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
}

exports.bidAuctionById = function (req, res) {
  Auction.findById(req.params.id, (err, auction) => {
    if (!auction) {
      res.status(400).send({ error: `Auction with id:${req.params.id} not found!`});
      console.log(err);
    }
    else {
      auction.Bids.push(req.body);
      auction.Number_of_Bids++;
      if (req.body.Amount > auction.Currently) {
        auction.Currently = req.body.Amount;
      }

      auction.save().then(auction => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
}

exports.deleteAuctionById = function () {
  Auction.findByIdAndRemove({_id: req.params.id}, (err, auction) => {
    if (err) {
      res.status(400).send({ error: `Auction with id:${req.params.id} not found!`});
      console.log(err);
    }
    else
      res.json('Removed successfully');
  });
}