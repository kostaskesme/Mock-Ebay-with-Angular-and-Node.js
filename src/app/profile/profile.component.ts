import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';
import { User } from '../models/user.type';
import { Auction } from '../models/auction.type';
import { CookieService } from 'ngx-cookie-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  approved: boolean;
  showApproveButton: boolean;
  userData: User[];
  auctionData: MatTableDataSource<Auction>;
  id: string = window.location.href.slice((window.location.href.lastIndexOf("/")) + 1);
  showEndTimeForm = false;
  auctionToStartId: string;


  timeData = new FormGroup({
    date: new FormControl('', [
      Validators.required
    ]),
    time: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private route: ActivatedRoute, private profileService: UserService, private auctionService: AuctionService, private cookieService: CookieService, private router: Router) {
    this.route.params.subscribe(params => console.log(params));
  }
  displayedColumns: string[] = ['email', 'username', 'firstName', 'lastName', 'phoneNumber',
    'address', 'location', 'country', 'afm', 'rating', 'approved', ' '];
  displayedColumnsAuction: string[] = ['name', 'firstBid', 'noOfBids', 'endTime', 'currentBid', 'buyPrice', 'started', 'view', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    if (!(this.cookieService.check('usersCookie'))) {
      alert('Not Authorized!');
      this.router.navigate(['']);
    }
    if ((JSON.parse(this.cookieService.get('usersCookie')).type != 0) && (JSON.parse(this.cookieService.get('usersCookie')).id != this.id)) {
      alert('Not Authorized2!');
      this.router.navigate(['']);
    }
    this.profileService.profile(this.id).then(response => {
      if (response.found) {
        this.userData = [response.User];
        this.approved = response.User.approved;
        if ((JSON.parse(this.cookieService.get('usersCookie')).type === 0) && (!response.User.approved)) {
          this.showApproveButton = true;
        }
      }
      else {
        console.log('cant find user!');
      }
    })
    this.auctionService.viewAuctionsBySeller(this.id).then(response => {
      if (response.found) {
        this.auctionData = new MatTableDataSource<Auction>(response.result);
        this.auctionData.paginator = this.paginator;
      }
      else {
        console.log('cant find auctions!');
      }
    })
  }

  onClick() {
    // if (this.approved) {
    //   alert('User is already approved');
    // }
    // else {
    this.profileService.approve(this.id).then(response => {
      if (response.found) {
        alert('User approved!');
        location.reload();
      }
      else {
        alert('error!');
      }
    })
    // }
  }

  view(auction: any){
    this.router.navigate([`viewAuction/${auction._id}`]);
  }

  start(auction: any) {
    this.showEndTimeForm = true;
    this.auctionToStartId = auction._id;
  }

  onEndTimeSubmit() {
    var endTime = {
      date: this.timeData.value.date,
      time: this.timeData.value.time
    };
    if ((Date.parse(endTime.date + 'T' + endTime.time)) < Date.now()) {
      alert('Please select a date in the fut');
    }
    else {
      this.auctionService.startAuction(this.auctionToStartId, endTime).then(response => {
        if (response.message) {
          this.showEndTimeForm = false;
          location.reload();
        }
        else {
          console.log(response.error);
        }
      })
    }
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
