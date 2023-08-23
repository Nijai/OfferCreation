import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SelectOffersComponent } from './select-offers/select-offers.component';
import { BillingComponent } from './billing/billing.component';
import { UpdateOfferComponent } from './update-offer/update-offer.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'add-offer', component: AddOfferComponent },
  { path: 'select-offer', component: SelectOffersComponent },
  { path: 'bill', component:BillingComponent},
  { path:'update-offer', component:UpdateOfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
