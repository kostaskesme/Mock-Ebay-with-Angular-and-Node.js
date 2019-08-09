import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuctionComponent } from './auction/auction.component';
import { ViewAuctionComponent } from '../app/view-auction/view-auction.component';
import { BrowseAuctionComponent } from './browse-auction/browse-auction.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'newAuction', component: AuctionComponent
  },
  {
    path : 'viewAuction/:id', component: ViewAuctionComponent
  },
  {
    path : 'viewAuction', component: BrowseAuctionComponent
  },
  // {
  //   path: '**', component: LoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
