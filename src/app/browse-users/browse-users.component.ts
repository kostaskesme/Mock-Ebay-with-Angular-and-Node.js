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
  selector: 'app-browse-users',
  templateUrl: './browse-users.component.html',
  styleUrls: ['./browse-users.component.scss']
})
export class BrowseUsersComponent implements OnInit {

  constructor(private router: Router, private browseUsersService: UserService,  private cookieService: CookieService, private auctionService: AuctionService) { }

  displayedColumns: string[] = ['username', 'email', 'rating', 'approved', 'action'];
  displayedColumns2: string[] = ['name','firstBid', 'noOfBids', 'endTime', 'currentBid', 'buyPrice', 'action'];
  userData: MatTableDataSource<User>;
  auctionData: MatTableDataSource<Auction>;

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;

  ngOnInit() {
    if((!(this.cookieService.check('usersCookie'))) || (JSON.parse(this.cookieService.get('usersCookie')).type != 0)){
      alert('Not Autorized!');
      this.router.navigate(['']);
    }
    this.browseUsersService.viewAllUsers().then(response => {
      if (response.found) {
        this.userData = new MatTableDataSource<User>(response.result);
        this.userData.paginator = this.paginator;
      }
      else {
        console.log(response.message);
      }
    });
    this.auctionService.viewAllAuctions().then(response => {
      if (response.found) {
        this.auctionData = new MatTableDataSource<Auction>(response.result);
        this.auctionData.paginator = this.paginator2;
      }
      else {
        console.log(response.message);
      }
    })
  }
  onClick(user: any) {
    this.router.navigate([`profile/${user._id}`]);
  }

  logout(){
    this.browseUsersService.logout();
  }

  toXML(obj) {
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += this.toXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += this.toXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
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
