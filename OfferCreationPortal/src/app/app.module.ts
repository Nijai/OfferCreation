import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddSubOfferComponent } from './add-sub-offer/add-sub-offer.component';
import { SelectOffersComponent } from './select-offers/select-offers.component';
import { HttpClientModule } from '@angular/common/http';
import { BillingComponent } from './billing/billing.component';
import { UpdateOfferComponent } from './update-offer/update-offer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AddOfferComponent,
    AddSubOfferComponent,
    SelectOffersComponent,
    BillingComponent,
    UpdateOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
