import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/services/auction.service';
import { Auction } from '../models/auction.type';
import { FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-view-auction',
  templateUrl: './view-auction.component.html',
  styleUrls: ['./view-auction.component.scss']
})

export class ViewAuctionComponent implements OnInit {

  constructor(private viewauctionService: AuctionService, private userService: UserService, private cookieService: CookieService) { }

  displayedColumns: string[] = ['name', 'desc', 'currentBid', 'noOfBids', 'buyPrice', 'firstBid', 'seller', 'sellerRat', 'location', 'country', 'startTime', 'endTime',];
  bidderColumns: string[] = ['amount', 'bidder', 'bidRat', 'time', 'location', 'country'];
  auctionData: Auction[];
  currently: Number;
  buyPrice: Number;
  sellerName: String;
  ifBids: Boolean;
  ifClicked: Boolean;
  bidData = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
    ])
  })
  loggedIn: Boolean;

  ngOnInit() {
    this.loggedIn = this.cookieService.check('usersCookie');
    var id = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
    this.viewauctionService.viewAuction(id).then(response => {
      if (response.found) {
        this.auctionData = [response.Auction];
        this.currently = this.auctionData[0].currently;
        this.buyPrice = this.auctionData[0].buyPrice;
        this.sellerName = this.auctionData[0].seller.username;
        this.ifBids = this.auctionData[0].numberOfBids > 0;
      }
      else {
        console.log('Cannot find auction!');
      }
    })
  }


  bid() {
    if (this.bidData.value.amount <= this.currently) {
      alert('Your bid must be larger than the current bid!');
    }
    else {
      var id = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
      var bidderData = JSON.parse(this.cookieService.get('usersCookie'));
      var bid = {
        bidder: {
          username: bidderData.username,
          rating: bidderData.rating,
          id: bidderData.id,
          location: bidderData.location,
          country: bidderData.country
        },
        time: Date.now(),
        amount: this.bidData.value.amount
      }

      this.viewauctionService.bidAuction(id, bid).then(response => {
        if (response.done){
          if(bid.amount >= this.auctionData[0].buyPrice){
            alert('Congratulations! \n You have met the buying price of the item and have won the auction!')
          }
          location.reload();
        }
        else
          console.log(response);
      })
    }
  }

  onClick() {
    if (!(this.cookieService.check('usersCookie'))) {
      alert('Not Autorized!');
    }
    else {
      var cookieData = JSON.parse(this.cookieService.get('usersCookie'));
      if (cookieData.username === this.sellerName) {
        alert('You cannot bid on an auction you created!');
      }
      else {
        alert('You cannot undo a bid once you have placed it!');
        this.ifClicked = true;
      }
    }
  }

  newAuctionButton() {
    this.viewauctionService.newAuctionRedirect();
  }

  GoToProfile() {
    this.userService.GoToProfile();
  }

  logout() {
    this.userService.logout();
  }

}
