import { Component, OnInit, ViewChild } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { Auction } from '../models/auction.type';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-browse-auction',
  templateUrl: './browse-auction.component.html',
  styleUrls: ['./browse-auction.component.scss']
})

export class BrowseAuctionComponent implements OnInit {

  constructor(private router: Router, private browseAuctiontionService: AuctionService, private userService: UserService, private cookieService: CookieService) { }

  displayedColumns: string[] = ['name', 'firstBid', 'noOfBids', 'endTime', 'currentBid', 'buyPrice', 'action'];
  auctionData: MatTableDataSource<Auction>;
  searchOptions: string[] = ['Name', 'Category', 'Description', 'Price', 'Location'];
  loggedIn: Boolean;

  searchForm = new FormGroup({
    option: new FormControl('', [
      Validators.required
    ]),
    search: new FormControl('', [
      Validators.required
    ])
  });

  fControls:any;
  submitted:boolean = false;
  bool1:boolean = false;
  bool2:boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    if (this.cookieService.get('usersCookie')) {
      this.bool2 = true;
    } else this.bool1 = true;

    this.fControls = this.searchForm.controls;
    this.loggedIn = this.cookieService.check('usersCookie');

    this.browseAuctiontionService.viewActiveAuctions().then(response => {
      if (response.found) {
        this.auctionData = new MatTableDataSource<Auction>(response.result);
        this.auctionData.paginator = this.paginator;
      }
      else {
        console.log(response.message);
      }
    });
  }

  onClick(auction: any) {
    this.router.navigate([`viewAuction/${auction._id}`]);
  }

  onSubmit() {
    this.submitted = true;

    if (this.searchForm.invalid) {
        return;
    }

    var option = this.searchForm.value.option;
    var term = this.searchForm.value.search;
    this.browseAuctiontionService.searchAuction(option, term).then(response => {
      if (response.found) {
        this.auctionData = new MatTableDataSource<Auction>(response.result);
        this.auctionData.paginator = this.paginator;
      }
      else {
        console.log(response.message);
      }
    });
  }

  newAuctionButton() {
    this.browseAuctiontionService.newAuctionRedirect();
  }

  GoToProfile() {
    this.userService.GoToProfile();
  }

  logout() {
    this.userService.logout();
  }
}
