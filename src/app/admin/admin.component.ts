import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuctionService } from '../services/auction.service';
import { User } from '../models/user.type';
import { Auction } from '../models/auction.type';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as convert from 'xml-js'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,  private cookieService: CookieService, private auctionService: AuctionService) { }

  displayedColumns: string[] = ['username', 'email', 'rating', 'approved', 'action1', 'action2'];
  displayedColumns2: string[] = ['name','firstBid', 'noOfBids', 'endTime', 'currentBid', 'buyPrice', 'action1', 'action2'];
  displayedColumns3: string[] = ['email', 'username', 'firstName', 'lastName', 'phoneNumber',
    'address', 'location', 'country', 'afm', 'rating', 'approved', ' '];
  displayedColumns4: string[] = ['name', 'desc','categories', 'currentBid', 'noOfBids', 'buyPrice',
  'firstBid', 'seller', 'sellerRat', 'location', 'country', 'startTime', 'endTime',];
  userData: MatTableDataSource<User>;
  auctionData: MatTableDataSource<Auction>;
  smUser: User[];
  smAuction: Auction[];
  bool1:boolean = false;
  bool2:boolean = true;
  bool3:boolean = false;
  bool4:boolean = false;

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;

  ngOnInit() {
    if((!(this.cookieService.check('usersCookie'))) || (JSON.parse(this.cookieService.get('usersCookie')).type != 0)){
      alert('Not Authorized!');
      this.router.navigate(['']);
    }
    this.userService.viewAllUsers().then(response => {
      if (response.found) {
        this.userData = new MatTableDataSource<User>(response.result);
        this.userData.paginator = this.paginator;
      }
      else {
        console.log(response.message);
      }
    });
  }

  seeMoreUser(user: any) {
    if (this.bool3 === false) {
      this.userService.profile(user._id).then(response => {
        if (response.found) {
          this.smUser = [response.User];
        }
        else {
          console.log('Cannot find user!');
        }
      });
      this.bool3 = true;
    } else this.bool3 = false;
  }

  seeMoreAuction(auction: any) {
    if (this.bool4 === false) {
      this.auctionService.viewAuction(auction._id).then(response => {
        if (response.found) {
          this.smAuction = [response.Auction];
        }
        else {
          console.log('Cannot find auction!');
        }
      });
      this.bool4 = true;
    } else this.bool4 = false;
  }

  onClickAuction(auction: any) {
    this.router.navigate([`viewAuction/${auction._id}`]);
  }

  logout(){
    this.userService.logout();
  }

  viewUsers() {
    this.userService.viewAllUsers().then(response => {
      if (response.found) {
        this.userData = new MatTableDataSource<User>(response.result);
        this.userData.paginator = this.paginator;
      }
      else {
        console.log(response.message);
      }
    });
    this.bool1 = false;
    this.bool2 = true;
  }

  viewAuctions() {
    this.auctionService.viewAllAuctions().then(response => {
      if (response.found) {
        this.auctionData = new MatTableDataSource<Auction>(response.result);
        this.auctionData.paginator = this.paginator2;
      }
      else {
        console.log(response.message);
      }
    })
    this.bool1 = true;
    this.bool2 = false;
  }

  approve(user:any) {
    this.userService.approve(user._id).then(response => {
      if (response.found) {
        //alert('User approved!');
        location.reload();
      }
      else {
        alert('error!');
      }
    })
  }

  export(auction: any, option: string) {
    var downloadAnchorNode = document.createElement('a');
    delete auction.__v;
    if (option === 'xml') {
      var temp1 = {
        seller: {
          _attributes: {
            username: auction.seller.username,
            rating: auction.seller.rating
          }
        }
      };
      delete auction.seller;
      var item = {
        _declaration: {
          _attributes: {
            version: "1.0",
            encoding: "utf-8"
          }
        },
        item: null
      };
      item.item = Object.assign(temp1, auction);
      var options = {compact: true, spaces: 4};
      var xml = convert.js2xml(item, options);
      var dataStr = "data:text/xml;charset=utf-8," + encodeURIComponent(xml);
    } else {
      var dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auction));
    }
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "auction");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
