import { Component, OnInit, Input } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { Auction } from '../models/auction.type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-browse-auction',
  templateUrl: './browse-auction.component.html',
  styleUrls: ['./browse-auction.component.scss']
})
export class BrowseAuctionComponent implements OnInit {

  constructor(private router: Router, private browseAuctiontionService: AuctionService) { }

  displayedColumns: string[] = ['firstBid', 'noOfBids', 'startTime', 'currentBid', 'buyPrice', 'action'];
  auctionData: Auction[] = [];

  ngOnInit() {
    this.browseAuctiontionService.viewAllAuctions().then(response => {
      if (response.found) {
        this.auctionData = Object.values(response.result);
      }
      else {
        console.log(response.message);
      }
    })
  }

  onClick(auction: any) {
    this.router.navigate([`viewAuction/${auction._id}`]);
  }
}
