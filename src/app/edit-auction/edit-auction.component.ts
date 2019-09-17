import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuctionService } from '../services/auction.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrls: ['./edit-auction.component.scss']
})
export class EditAuctionComponent implements OnInit {

  id: string;
  auction: any;

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
    description: new FormControl('')
  }, { validators: ValidateBuyPrice});

  loggedIn: Boolean;


  bool1: boolean;
  bool2: boolean;
  bool3: boolean;

  constructor(private router: Router, private auctionService: AuctionService, private userService: UserService,
    private cookieService: CookieService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (!(this.cookieService.check('usersCookie'))) {
      alert('Not Authorized!');
      this.router.navigate(['']);
    }
    this.loggedIn = true;
    //TINAFTORE?
    this.bool1 = this.auctData.controls.name.errors.required;
    this.bool2 = this.auctData.controls.category.errors.required;
    this.bool3 = this.auctData.controls.firstBid.errors.required;

    this.route.params.subscribe(params => {
      this.id = params.id;
      this.auctionService.viewAuction(this.id).then(response => {
        if (response.found) {
          this.auction = response.Auction;
          this.auctData.get('name').setValue(this.auction.name);
          this.auctData.get('category').setValue(this.auction.category);
          this.auctData.get('firstBid').setValue(this.auction.firstBid);
          this.auctData.get('buyPrice').setValue(this.auction.buyPrice);
          this.auctData.get('description').setValue(this.auction.description);
        }
        else {
          console.log('Cannot find auction!');
        }
      })
    });
  }

  onSubmit() {
    if (this.auctData.invalid) {
      alert("form is invalid");
      return;
    }
    var auctionData = this.auctData.value;
    //auctionData.ends = null;
    this.auctionService.editAuction(this.id, auctionData).then(response => {
      if (response.done) {
        this.userService.GoToProfile();
      }
      else {
        console.log(response.message);
      }
    });
  }

  GoToProfile() {
    this.userService.GoToProfile();
  }
}
