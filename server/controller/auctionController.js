var Auction = require('../models/auction');

exports.createAuction = function (req, res) {
  //console.log(req.body);
  var auctionFromRequest = new Auction(req.body);
  auctionFromRequest.save().then(AuctionFromdb => {
    console.log(AuctionFromdb);
    res.status(200).json({ created: true, auctionId: AuctionFromdb._id });
  })
    .catch(err => {
      res.status(400).send({ created: false, message: err });
    });
}

exports.getAuctionById = function (req, res) {
  Auction.findById(req.params.id, (err, auction) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Auction not found' });
      console.log(err);
    }
    else {
      res.status(200).json({ found: true, Auction: auction });
    }
  });

}

exports.getAllAuctions = function (req, res) {
  Auction.find({ started: { $ne: null } },(err, auctionList) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Auction not found' });
      console.log(err);
    }
    else
      res.status(200).json({ found: true, result: auctionList });
  });
}

exports.getAuctionsBySeller = function (req, res) {
  Auction.find({ 'seller.id': req.params.id },(err, auctionList) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Auction not found' });
      console.log(err);
    }
    else
      res.status(200).json({ found: true, result: auctionList });
      console.log(auctionList);
  });
}

exports.startAuctionById = function (req, res) {
  Auction.findById(req.params.id ,(err, auction) => {
    if (!auction) {
      res.status(400).send({ error: `Auction with id:${req.params.id} not found!` });
      console.log(err);
    }
    else {
      auction.started = Date.now();
      auction.save().then(auction => {
        res.status(200).json({ message: `Auction with id:${req.params.id} started!` });
        console.log(auction);
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
}

exports.updateAuctionById = function (req, res) {
  Auction.findById(req.params.id, (err, auction) => {
    if (!auction) {
      res.status(400).send({ error: `Auction with id:${req.params.id} not found!` });
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
      res.status(400).send({ done: false, message: `Auction with id:${req.params.id} not found!`, error: err });
    }
    else {
      console.log('before', auction.numberOfBids);
      auction.bids.push(req.body);
      auction.numberOfBids = auction.numberOfBids +1;
      auction.currently = req.body.amount;
      auction.save().then(auction => {
        console.log('/nafter', auction)
        res.send({ done: true, message: 'Update Done' });
      }).catch(err => {
        res.status(400).send({ done: false, message: 'Update Failed' });
      });
    }
  });
}

exports.deleteAuctionById = function () {
  Auction.findByIdAndRemove({ _id: req.params.id }, (err, auction) => {
    if (err) {
      res.status(400).send({ error: `Auction with id:${req.params.id} not found!` });
      console.log(err);
    }
    else
      res.json('Removed successfully');
  });
}
