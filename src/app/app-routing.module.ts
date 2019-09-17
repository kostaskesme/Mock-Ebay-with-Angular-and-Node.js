import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuctionComponent } from './auction/auction.component';
import { ViewAuctionComponent } from '../app/view-auction/view-auction.component';
import { BrowseAuctionComponent } from './browse-auction/browse-auction.component';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { ProfileComponent } from './profile/profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditAuctionComponent } from './edit-auction/edit-auction.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'login', component: LoginComponent
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
  {
    path : 'viewUser', component: BrowseUsersComponent
  },
  {
    path : 'profile/:id', component: ProfileComponent
  },
  {
    path : 'edit/:id', component: EditAuctionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
