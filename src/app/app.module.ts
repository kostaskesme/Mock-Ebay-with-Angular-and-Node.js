import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatMenuModule,
        MatTabsModule} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './core/material.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { AuctionComponent } from './auction/auction.component';
import { AuctionService } from './services/auction.service';
import { ViewAuctionComponent } from './view-auction/view-auction.component';
import { BrowseAuctionComponent } from './browse-auction/browse-auction.component';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { UserService } from './services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuctionComponent,
    ViewAuctionComponent,
    BrowseAuctionComponent,
    BrowseUsersComponent,
    ProfileComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    CustomMaterialModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, AuctionService, UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
