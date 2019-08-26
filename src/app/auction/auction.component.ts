import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuctionService } from '../services/auction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})

export class AuctionComponent implements OnInit {
  auctionForm = new FormGroup({
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
    location: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
      Validators.required
    ]),
    ends: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router: Router, private auctionService: AuctionService) { }

  onSubmit() {
    if (this.auctionForm.invalid) {
      //alert("form is invalid");
      return;
    }
    console.log('clicked');
    console.log(this.auctionForm.controls.name.value);
    console.log(this.auctionForm.controls.category.value);
    console.log(this.auctionForm.controls.firstBid.value);
    console.log(this.auctionForm.controls.buyPrice.value);
    console.log(this.auctionForm.controls.location.value);
    console.log(this.auctionForm.controls.country.value);
    console.log(this.auctionForm.controls.ends.value);
    console.log(this.auctionForm.controls.description.value);

    this.auctionService.createAuction("hbfdkfgfdgbdfgrrbrsaww",this.auctionForm.controls.name.value,
    this.auctionForm.controls.category.value,this.auctionForm.controls.firstBid.value,
    this.auctionForm.controls.buyPrice.value,this.auctionForm.controls.location.value,
    this.auctionForm.controls.country.value,this.auctionForm.controls.ends.value, 10,
    "5d4f04ca63ff8018c461e527",this.auctionForm.controls.description.value).then(response => {
      console.log(response);
      if (response.created) {
        var id = response.auctionId;
        this.router.navigate([`viewAuction/${id}`]);
      }
    })
  }

  ngOnInit() {
  }

}
