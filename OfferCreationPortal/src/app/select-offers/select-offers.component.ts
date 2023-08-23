import { Component, OnInit } from '@angular/core';
import { GetOrderService } from '../service/get-order.service';
import { Offer } from '../Offer';
import { SubOffer } from '../SubOffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-offers',
  templateUrl: './select-offers.component.html',
  styleUrls: ['./select-offers.component.css']
})
export class SelectOffersComponent implements OnInit{
  offers:Offer[];
  selectedOffer: Offer | null = null;
  offerforward:Offer;
  disable: boolean = false;
  showSnackbar: boolean = false;
  snackbarMessage: string = '';
  offerId:number=0;
  subOffers:number[]=[];
  
  constructor(private getOrderService:GetOrderService, private router:Router){
    this.offers = [];
    this.offerforward = new Offer();
  }
  
  ngOnInit(){
    this.getOrderService.getOffers().subscribe(
      (res:any)=>{
        console.log(res);
        this.offers = res;
      },(err:any)=>{
        console.log("Error: "+err);
      }
    )
  }
  selectOffer(offer: Offer) {
    this.selectedOffer = offer;
    this.offerId=offer.id;
    this.offerforward.activationDate = offer.activationDate;
    this.offerforward.expirationDate = offer.expirationDate;
    this.offerforward.offerDescription = offer.offerDescription;
    this.offerforward.offerName = offer.offerName;
    this.offerforward.offerType = offer.offerType;
    this.offerforward.subOffers = [];
    this.subOffers =[];
    console.log(offer.id);
  }

  selectSubOffer(subOffer: SubOffer) {
    // Check if the subOffer already exists in the subOffers array
    const existingSubOffer = this.offerforward?.subOffers.find(
        existingSub => existingSub.subOfferName === subOffer.subOfferName
    );

    if (!existingSubOffer) {
        // Suboffer doesn't exist, push it to the subOffers array
        this.offerforward?.subOffers.push(subOffer);
        console.log(this.offerforward);
        this.subOffers.push(subOffer.subOfferId);
    } else {
        this.showSnackbar = true;
        this.snackbarMessage = 'Suboffer already exists';
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        console.log('Suboffer already exists');
    }
}


  proceed(){
      const subOffersString = this.subOffers.join(',');
      sessionStorage.setItem('subOffers', subOffersString);
      sessionStorage.setItem('offerID', this.offerId.toString());
      this.router.navigate(['bill']);
  }
}
