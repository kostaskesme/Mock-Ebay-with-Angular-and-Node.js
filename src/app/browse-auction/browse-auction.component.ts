import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { Auction } from '../models/auction.type';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-browse-auction',
  templateUrl: './browse-auction.component.html',
  styleUrls: ['./browse-auction.component.scss']
})

export class BrowseAuctionComponent implements OnInit {

  constructor(private router: Router, private browseAuctiontionService: AuctionService, private userService: UserService) { }

  displayedColumns: string[] = ['name', 'firstBid', 'noOfBids', 'endTime', 'currentBid', 'buyPrice', 'action'];
  auctionData: MatTableDataSource<Auction>;
  searchOptions: string[] = ['Name', 'Category', 'Description', 'Price', 'Location'];
  option = new FormControl();
  search = new FormControl();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.browseAuctiontionService.viewAllAuctions().then(response => {
      if (response.found) {
        this.auctionData = new MatTableDataSource<Auction>(response.result);
        this.auctionData.paginator = this.paginator;
      }
      else {
        console.log(response.message);
      }
    })
  }

  onClick(auction: any) {
    this.router.navigate([`viewAuction/${auction._id}`]);
  }

  onSubmit() {
    alert("works");
  }
  newAuctionButton() {
    this.browseAuctiontionService.newAuctionRedirect();
  }

  logout() {
    this.userService.logout();
  }
}
