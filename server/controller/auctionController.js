var Auction = require('../models/auction');

exports.createAuction = function (req, res) {
  //console.log(req.body);
  var auctionFromRequest = new Auction(req.body);
  auctionFromRequest.save().then(AuctionFromdb => {
    //console.log(AuctionFromdb);
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
  Auction.find({ started: { $ne: null } }, (err, auctionList) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Auction not found' });
      console.log(err);
    }
    else
      res.status(200).json({ found: true, result: auctionList });
  });
}

exports.getActiveAuctions = function (req, res) {
  Auction.find({ started: { $ne: null }, ends: { $gt: Date.now() } }, (err, auctionList) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Auction not found' });
      console.log(err);
    }
    else
      res.status(200).json({ found: true, result: auctionList });
  });
}

exports.getAuctionsBySeller = function (req, res) {
  Auction.find({ 'seller.id': req.params.id }, (err, auctionList) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Auction not found' });
      console.log(err);
    }
    else {
      res.status(200).json({ found: true, result: auctionList });
    }
  });
}

exports.startAuctionById = function (req, res) {
  Auction.findById(req.params.id, (err, auction) => {
    if (!auction) {
      res.status(400).send({ error: `Auction with id:${req.params.id} not found!` });
      console.log(err);
    }
    else {
      auction.started = Date.now();
      auction.ends = req.body.date + 'T' + req.body.time;
      auction.save().then(auction => {
        res.status(200).json({ message: `Auction with id:${req.params.id} started!` });
        console.log(`Auction with id:${req.params.id} started!`);
      }).catch(err => {
        console.log(err);
        res.status(400).send('Update failed');
      });
    }
  });
}

function textSearch(res, field, term) {
  Auction.find({ [field]: new RegExp(term, 'i'), started: { $ne: null }, ends: { $gt: Date.now() } }, (err, auctionList) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Auction not found' });
      console.log(err);
    }
    else {
      res.status(200).json({ found: true, result: auctionList });
      console.log(auctionList);
    }
  });
}

function numSearch(res, field, term) {
  Auction.find({ [field]: { $gte: term - 10, $lte: 10 + parseInt(term) } }, (err, auctionList) => {
    if (err) {
      res.status(400).send({ found: false, message: 'Auction not found' });
      console.log(err);
    }
    else {
      res.status(200).json({ found: true, result: auctionList });
      console.log(auctionList);
    }
  });
}

exports.searchAuction = function (req, res) {
  if (req.params.option === 'Name') {
    textSearch(res, 'name', req.params.term);
  }
  if (req.params.option === 'Category') {
    textSearch(res, 'category', req.params.term);
  }
  if (req.params.option === 'Description') {
    textSearch(res, 'description', req.params.term);
  }
  if (req.params.option === 'Price') {
    numSearch(res, 'buyPrice', req.params.term);
  }
  if (req.params.option === 'Location') {
    textSearch(res, 'location', req.params.term);
  }
}

exports.updateAuctionById = function (req, res) {
  Auction.findById(req.params.id, (err, auction) => {
    if (!auction) {
      res.status(400).send({ done: false, message: `Auction with id:${req.params.id} not found!` });
      console.log(err);
    }
    else {
      auction.name = req.body.name;
      auction.category = req.body.category;
      auction.currently = req.body.firstBid;
      auction.firstBid = req.body.firstBid;
      auction.buyPrice = req.body.buyPrice;
      auction.ends = req.body.ends;
      auction.description = req.body.description;

      auction.save().then(auction => {
        res.send({ done: true, message: 'Update Done' });
      }).catch(err => {
        res.status(400).send({ done: false, message: 'Update Failed' });
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
      auction.bids.push(req.body);
      auction.numberOfBids = auction.numberOfBids + 1;
      auction.currently = req.body.amount;
      if (auction.currently >= auction.buyPrice) {
        auction.ends = Date.now();
      }
      auction.save().then(auction => {
        res.send({ done: true, message: 'Update Done' });
      }).catch(err => {
        res.status(400).send({ done: false, message: 'Update Failed' });
      });
    }
  });
}

exports.deleteAuctionById = function (req, res) {
  Auction.findByIdAndRemove({ _id: req.params.id }, (err, auction) => {
    if (err) {
      res.status(400).send({ error: `Auction with id:${req.params.id} not found!` });
      console.log(err);
    }
    else
      res.json({ done: true, message: 'Removed successfully' });
  });
}
