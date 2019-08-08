import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/services/auction.service';
import { ActivatedRoute } from "@angular/router";
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-view-auction',
  templateUrl: './view-auction.component.html',
  styleUrls: ['./view-auction.component.scss']
})
export class ViewAuctionComponent implements OnInit {
  firstBid = new FormControl();
  noOfBids = new FormControl();
  startTime = new FormControl();
  endTime = new FormControl();
  currentBid = new FormControl();
  buyPrice = new FormControl();

  constructor(private route: ActivatedRoute, private viewauctionService: AuctionService, ) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit() {
    var id = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
    this.viewauctionService.viewAuction(id).then(response => {
      if (response.found) {
        this.firstBid.setValue(response.Auction.firstBid);
        this.firstBid.disable();
        this.noOfBids.setValue(response.Auction.noOfBids);
        this.noOfBids.disable();
        this.startTime.setValue(response.Auction.startTime);
        this.startTime.disable();
        this.currentBid.setValue(response.Auction.currentBid);
        this.currentBid.disable();
        this.buyPrice.setValue(response.Auction.buyPrice);
        this.buyPrice.disable();
      }
      else{
        console.log('cant find auction!');
      }
    })
  }
}
