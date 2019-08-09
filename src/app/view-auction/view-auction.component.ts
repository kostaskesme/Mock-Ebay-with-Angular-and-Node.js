import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/services/auction.service';
import { ActivatedRoute } from "@angular/router";
import { FormControl } from '@angular/forms';
import { Auction } from '../models/auction.type';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-view-auction',
  templateUrl: './view-auction.component.html',
  styleUrls: ['./view-auction.component.scss']
})




export class ViewAuctionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private viewauctionService: AuctionService, ) {
    this.route.params.subscribe(params => console.log(params));
  }

  displayedColumns: string[] = ['firstBid', 'noOfBids', 'startTime', 'currentBid', 'buyPrice'];
  auctionData: Auction[] = [];

  ngOnInit() {
    var id = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
    this.viewauctionService.viewAuction(id).then(response => {
      if (response.found) {
        this.auctionData = [response.Auction];
      }
      else {
        console.log('cant find auction!');
      }
    })
  }



}
