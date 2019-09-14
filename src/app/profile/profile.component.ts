import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';
import { User } from '../models/user.type';
import { Auction } from '../models/auction.type';
import { CookieService } from 'ngx-cookie-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  approved: boolean;
  userData: User[];
  auctionData: MatTableDataSource<Auction>;
  id: string = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
  displayedColumns: string[] = ['email', 'username', 'firstName', 'lastName', 'phoneNumber',
    'address', 'location', 'country', 'afm', 'rating', 'approved', ' '];
  displayedColumnsAuction: string[] = ['name', 'firstBid', 'noOfBids', 'endTime', 'currentBid', 'buyPrice', 'started','actions'];

  constructor(private route: ActivatedRoute, private profileService: UserService, private auctionService: AuctionService,
    private cookieService: CookieService, private router: Router) {
    this.route.params.subscribe(params => console.log(params));
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    // check if User is LoggedIN
    if (!(this.cookieService.check('usersCookie'))) {
      alert('Not Authorized!');
      this.router.navigate(['']);
    }
    if ((JSON.parse(this.cookieService.get('usersCookie')).type != 0) && (JSON.parse(this.cookieService.get('usersCookie')).id != this.id)) {
      alert('Not Authorized!');
      this.router.navigate(['']);
    }
    this.profileService.profile(this.id).then(response => {
      if (response.found) {
        this.userData = [response.User];
        this.approved = response.User.approved;
      }
      else {
        console.log('cant find user!');
      }
    })
    this.auctionService.viewAuctionsBySeller(this.id).then(response => {
      if (response.found) {
        this.auctionData = new MatTableDataSource<Auction>(response.result);
        this.auctionData.paginator = this.paginator;
        console.log(this.auctionData);
      }
      else {
        console.log('cant find auctions!');
      }
    })
  }

  onClick() {
    if (this.approved) {  // COOKIES!!
      alert('User is already approved');
    }
    else {
      this.profileService.approve(this.id).then(response => {
        if (response.found) {
          alert('User approved!');
          location.reload();
        }
        else {
          alert('error!');
        }
      })
    }
  }

  start(auction: any) {
    this.auctionService.startAuction(auction._id).then(response => {
      if (response.message) {
        console.log(response.message);
        location.reload();
      }
      else {
        console.log(response.error);
      }
    })
  }

  delete(auction: any) {
    this.auctionService.deleteAuction(auction._id).then(response => {
      if (response.done) {
        console.log(response.message);
        location.reload();
      }
      else {
        console.log(response.error);
      }
    })
  }

  logout() {
    this.profileService.logout();
  }

  newAuctionButton() {
    this.auctionService.newAuctionRedirect();
  }
}
