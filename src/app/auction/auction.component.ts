import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuctionService } from '../services/auction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})

export class AuctionComponent implements OnInit {
  name = new FormControl();
  category = new FormControl();
  firstBid = new FormControl();
  buyPrice = new FormControl();
  location = new FormControl();
  country = new FormControl();
  ends = new FormControl();
  description = new FormControl();

  constructor(private router: Router, private auctionService: AuctionService) { }

  onSubmit() {
    /*console.log('clicked');
    console.log(this.name);
    console.log(this.category);
    console.log(this.firstBid);
    console.log(this.buyPrice);
    console.log(this.location);
    console.log(this.country);
    console.log(this.ends);
    console.log(this.description);*/

    this.auctionService.createAuction("hbfdkfheuhfurgbggvbfb",this.name.value,this.category.value,this.firstBid.value,this.buyPrice.value,
      this.location.value,this.country.value,this.ends.value, 10, "5d4f04ca63ff8018c461e527",this.description.value).then(response => {
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
