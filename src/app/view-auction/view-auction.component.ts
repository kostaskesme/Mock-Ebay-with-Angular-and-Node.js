import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/services/auction.service';
import { ActivatedRoute } from "@angular/router";
import { FormControl } from '@angular/forms';
import { Auction } from '../models/auction.type';
//import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-view-auction',
  templateUrl: './view-auction.component.html',
  styleUrls: ['./view-auction.component.scss']
})

export class ViewAuctionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private viewauctionService: AuctionService, ) {
    //this.route.params.subscribe(params => console.log(params));
  }

  displayedColumns: string[] = ['firstBid','noOfBids','currentBid','buyPrice','location','country','startTime','endTime','sellerRat','sellerId','desc'];
  bidderColumns: string[] = ['bidder','bidRat','loc','count','time','amount'];
  auctionData: Auction[];
  ifBids: boolean;
  amount = new FormControl();

  ngOnInit() {
    var id = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
    this.viewauctionService.viewAuction(id).then(response => {
      if (response.found) {
        this.auctionData = [response.Auction];
        this.ifBids = this.auctionData[0].Number_of_Bids > 0;
        //console.log(this.ifBids);
      }
      else {
        console.log('Cannot find auction!');
      }
    })
  }

  onClick() {
    alert("not ready yet");
    /*this.auctionService.bidAuction(rating,userid,location,country,this.amount.value).then(response => {
      console.log(response);
      if (response.created) {
        var id = response.auctionId;
        this.router.navigate([`viewAuction/${id}`]);
      }
    })*/
  }
}
