import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/services/auction.service';
//import { ActivatedRoute } from "@angular/router";
import { Auction } from '../models/auction.type';
import { FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
//import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-view-auction',
  templateUrl: './view-auction.component.html',
  styleUrls: ['./view-auction.component.scss']
})

export class ViewAuctionComponent implements OnInit {

  constructor(/*private route: ActivatedRoute,*/ private viewauctionService: AuctionService, private userService: UserService, private cookieService: CookieService) {
    //this.route.params.subscribe(params => console.log(params));
  }

  displayedColumns: string[] = ['name', 'desc', 'currentBid', 'noOfBids', 'buyPrice', 'firstBid', 'seller', 'sellerRat', 'location', 'country', 'startTime', 'endTime',];
  bidderColumns: string[] = ['amount', 'bidder', 'bidRat', 'time', 'location', 'country'];
  auctionData: Auction[];
  currently: Number;
  buyPrice: Number;
  sellerName: String;
  ifBids: boolean;
  ifClicked: boolean;
  bidData = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
    ])
  })

  ngOnInit() {
    var id = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
    this.viewauctionService.viewAuction(id).then(response => {
      if (response.found) {
        this.auctionData = [response.Auction];
        this.currently = this.auctionData[0].currently;
        this.buyPrice = this.auctionData[0].buyPrice;
        this.sellerName = this.auctionData[0].seller.username;
        console.log('number of bids', this.auctionData[0].numberOfBids);
        this.ifBids = this.auctionData[0].numberOfBids > 0;
      }
      else {
        console.log('Cannot find auction!');
      }
    })
  }


  bid() {
    if ((this.bidData.value.amount <= this.currently) || (this.bidData.value.amount >= this.buyPrice)) {
      alert('Your bid must be between the current bid and the buying price!');
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
        console.log(response);
        if (response.done)
          location.reload();
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

  logout() {
    this.userService.logout();
  }

}
