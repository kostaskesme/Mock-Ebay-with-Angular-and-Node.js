import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatCardModule, MatButtonModule} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from './core/material.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { AuctionComponent } from './auction/auction.component';
import { AuctionService } from './services/auction.service';
import { ViewAuctionComponent } from './view-auction/view-auction.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuctionComponent,
    ViewAuctionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    CustomMaterialModule,
    MatCardModule, MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, AuctionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
