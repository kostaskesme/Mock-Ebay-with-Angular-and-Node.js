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
  firstBid = new FormControl();
  buyPrice = new FormControl();

  constructor(private router: Router, private auctionService: AuctionService) { }

  onSubmit() {
    console.log('clicked');
    console.log(this.firstBid);
    console.log(this.buyPrice);

    this.auctionService.createAuction(this.firstBid.value, this.buyPrice.value).then(response => {
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