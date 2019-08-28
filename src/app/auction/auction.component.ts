import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuctionService } from '../services/auction.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';


const ValidateBuyPrice: ValidatorFn = (control: FormGroup): ValidationErrors | null => { //+VALIDATOR FOR ENDTIME > STARTTIME
  const firstBid = control.get('firstBid');
  const buyPrice = control.get('buyPrice');
  if (firstBid.value < buyPrice.value)
    return null;
  else
    return { 'validBuyPrice': false };
};

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})

export class AuctionComponent implements OnInit {
  auctData = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    firstBid: new FormControl('', [
      Validators.required
    ]),
    buyPrice: new FormControl(''),
    ends: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('')
  }, { validators: ValidateBuyPrice });

  constructor(private router: Router, private auctionService: AuctionService, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit() {
    if (!(this.cookieService.check('usersCookie'))) {
      alert('Not Autorized!');
      this.router.navigate(['']);
    }
  }

  onSumbit() {
    var auctionData = this.auctData.value;
    var userData = JSON.parse(this.cookieService.get('usersCookie'));
    auctionData.seller = {
      id: userData.id,
      username: userData.username,
      rating: userData.rating,
    }
    auctionData.numberOfBids = 0;
    auctionData.started = Date.now();
    auctionData.currently = auctionData.firstBid
    auctionData.location = userData.location;
    auctionData.country = userData.country;
    this.auctionService.createAuction(auctionData).then(response => {
      if (response.created) {
        this.router.navigate([`viewAuction/${response.auctionId}`])
      }
      else{
        console.log(response.message);
      }
    })
    // this.auctionService.createAuction("hbfdkfheuhfurgbggvbfb", this.name.value, this.category.value, this.firstBid.value, this.buyPrice.value,
    //   this.location.value, this.country.value, this.ends.value, 10, "5d4f04ca63ff8018c461e527", this.description.value).then(response => {
    //     console.log(response);
    //     if (response.created) {
    //       var id = response.auctionId;
    //       this.router.navigate([`viewAuction/${id}`]);
    //     }
    //   })
  }

  logout() {
    this.userService.logout();
  }

}
