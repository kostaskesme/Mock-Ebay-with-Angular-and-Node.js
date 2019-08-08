var Auction = require('../models/auction');

exports.createAuction = function (req, res) {         // works!
    var auctionFromRequest = new Auction(req.body);
    auctionFromRequest.save()
        .then(AuctionFromdb => {
            res.status(200).json({ created: true, auctionId: AuctionFromdb._id });
        })
        .catch(err => {
            res.status(400).send({ created: false, message: 'Error' });
        });
}

exports.getAuctionById = function (req, res) {
    Auction.findById(req.params.id, (err, auction) => {
        if (err)
            res.status(400).send({ found: false, message: 'Auction not found' });
        else{
            res.status(200).json({ found: true, Auction: auction });
        }
    });
}

exports.updateAuctionById = function (req, res) {
    Auction.findById(req.params.id, (err, auction) => {
        if (!auction)
            return next(new Error('Could not load Document'));
        else {
            auction.noOfBids = req.body.noOfBids;
            auction.endTime = req.body.endTime;
            auction.currentBid = req.body.currentBid;
            auction.buyPrice = req.body.buyPrice;
            auction.save().then(auction => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
}

exports.deleteAction = function () {
    Auction.findByIdAndDelete(req._id)
}