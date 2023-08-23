import { Component, OnInit } from '@angular/core';
import { GetOrderService } from '../service/get-order.service';
import { Offer } from '../Offer';
import { SubOffer } from '../SubOffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit{
  offerID:number=0;
  subOffersString:string='';
  amount:string='';
  offer:Offer;
  OfferData:Offer;
  suboffer:SubOffer[]=[];
  showPopup:boolean=false;

  constructor(private getOrderService:GetOrderService, private router:Router){
    this.offer = new Offer();
    this.OfferData = new Offer();
  }
  

  ngOnInit(): void {
    this.subOffersString = sessionStorage.getItem('subOffers')??'';
    const offerIDString = sessionStorage.getItem('offerID');

    if (offerIDString) {
      // Convert the offerID string back to a number
      this.offerID = parseInt(offerIDString, 10);
      console.log(this.offerID);
      this.getOrderService.getOfferById(this.offerID).subscribe(
        (res:any)=>{
          this.OfferData = res;
          console.log(this.OfferData);
        },(err:any)=>{
          console.log("err: ",err.message,err);
        }
      );
    } else {
      console.log('No offerID found in sessionStorage');
    }


    if(this.subOffersString != ''){
      console.log(this.subOffersString);
      this.getOrderService.selectOfferWithSubOffer(this.offerID,this.subOffersString).subscribe(
        (res:any)=>{
            console.log(res);
            this.amount= res;
            const subOffers = this.subOffersString.split(',').map(Number);
            subOffers.forEach(subOffer => {
              console.log("aub "+subOffer);
            });
            
        },(err:any)=>{
          const amountTextres = err.error.text;
          const amountFilterres = amountTextres.match(/[\d.]+/g)[0];
          this.amount = amountFilterres;
          const subOffers = this.subOffersString.split(',').map(Number);
            subOffers.forEach(subOffer => {
              console.log("sub in err "+subOffer);
              this.getOrderService.getSubOfferById(subOffer).subscribe(
                (res:any)=>{
                    this.suboffer.push(res);
                    console.log(this.suboffer);
                },(err:any)=>{
                  console.log("err");
                  console.log(err);
                }
              );
            });
        }
    );
    }else{
      this.getOrderService.selectOfferID(this.offerID).subscribe(
          (res:any)=>{
            const amountTextres = res;
            const amountFilterres = amountTextres.match(/[\d.]+/g)[0]
            console.log(amountFilterres);
            this.amount = res.match(/[\d.]+/g)[0];
              console.log("res"+res);
          },(err:any)=>{
            const amountText = err.error.text;
            const amountFilter = amountText.match(/[\d.]+/g)[0]
            this.amount = amountFilter;
            console.log("Amount: "+this.amount);
          }
      );
    }
  }

  openPopup(){
    this.showPopup =true;
  }

  closePopup(){
    this.showPopup = false;
    this.router.navigate(['']);
  }

}
