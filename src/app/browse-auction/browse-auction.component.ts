import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { Auction } from '../models/auction.type';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-browse-auction',
  templateUrl: './browse-auction.component.html',
  styleUrls: ['./browse-auction.component.scss']
})

export class BrowseAuctionComponent implements OnInit {

  constructor(private router: Router, private browseAuctiontionService: AuctionService) { }

  displayedColumns: string[] = ['name','firstBid', 'noOfBids', 'endTime', 'currentBid', 'buyPrice', 'action'];
  auctionData: MatTableDataSource<Auction>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.browseAuctiontionService.viewAllAuctions().then(response => {
      if (response.found) {
        for (var i = 0; i < response.result.length; i++) {
          response.result[i].Ends = new Date(response.result[i].Ends).toUTCString();
        }
        this.auctionData = new MatTableDataSource<Auction>(response.result);
        this.auctionData.paginator = this.paginator;
      }
      else {
        console.log(response.message);
      }
    })
  }

  onClick(auction: any){
    this.router.navigate([`viewAuction/${auction._id}`]);
  }
}
