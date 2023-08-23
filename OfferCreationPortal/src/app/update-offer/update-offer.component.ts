import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../Offer';
import { SubOffer } from '../SubOffer';
import { GetOrderService } from '../service/get-order.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.css']
})
export class UpdateOfferComponent implements OnInit{
  offers:Offer[];
  selectedOffer: Offer | null = null;
  offerforward:Offer;
  subOfferforward:SubOffer;
  showSnackbar: boolean = false;
  snackbarMessage: string = '';
  offerId:number=0;
  subOffers:number[]=[];
  offerForm: FormGroup;
  subofferForm: FormGroup;
  showForm1: boolean = false;
  showForm2: boolean = false;
  
  constructor(private getOrderService:GetOrderService, private router:Router,private fb:FormBuilder){
    this.offers = [];
    this.offerforward = new Offer();
    this.subOfferforward = new SubOffer();
    this.offerForm = this.fb.group({
      id: [0],
      offerName: [''],
      offerDescription: [''],
      offerType: [''],
      activationDate: [''],
      expirationDate: [''],
    });

    this.subofferForm = this.fb.group({
      subOfferId:[0],
      subOfferName:[''],
      price:[''],
      validity:[''],
      parentRelation: ['']
      }
    );
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

  isInvalid(controlName: string) {
    const control = this.offerForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  issubInvalid(controlName: string) {
    const control = this.subofferForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  

  offerNameValidator(control: AbstractControl): ValidationErrors | null {
    const offerName = control.value;
    console.log("offer Name");
    console.log(offerName);
    const regex = /^[A-Za-z0-9-$ ]*$/;
    if (offerName.length > 30 || !regex.test(offerName)) {
      return { offerNameError: true };
    }
    return null;
  }

  subofferNameValidator(control: AbstractControl): ValidationErrors | null {
    const subofferName = control.value;
    const regex = /^[A-Za-z0-9-$ ]*$/;
    if (subofferName.length > 30 || !regex.test(subofferName)) {
      return { subofferNameError: true };
    }
    return null;
  }

  validityValidator(control: AbstractControl): ValidationErrors | null {
    const validityValue = control.value;
    if (validityValue % 28 !== 0) {
      return { validityError: true };
    }
    return null;
  }

  openOffer(offer:Offer){
    this.showForm1 = true;
    this.offerForm.patchValue({
      id:offer.id,
      offerName: offer.offerName,
      offerDescription: offer.offerDescription,
      offerType: offer.offerType,
      activationDate: offer.activationDate,
      expirationDate: offer.expirationDate
    });
  }
  updateOffer(){
    this.offerforward.id = this.offerForm.value.id;
    this.offerforward.activationDate = this.offerForm.value.activationDate;
    this.offerforward.expirationDate = this.offerForm.value.expirationDate;
    this.offerforward.offerDescription = this.offerForm.value.offerDescription;
    this.offerforward.offerName = this.offerForm.value.offerName;
    this.offerforward.offerType = this.offerForm.value.offerType;
    this.offerforward.subOffers = [];
    console.log(this.offerForm.value.id);
    console.log("offerforward");
    console.log(this.offerforward)
    this.getOrderService.updateOffer(this.offerforward, this.offerforward.id).subscribe(
      (res:any)=>{
        console.log("res");
        console.log(res);
        this.closeOfferForm();
        this.showSnackbar = true;
        this.snackbarMessage = 'Offer Updated Successfully!';
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        this.router.navigate(['update-offer'])
      },(err:any)=>{
        console.log("err "+err.error.message);
        this.closeOfferForm();
        this.showSnackbar = true;
        this.snackbarMessage = "Error Occurred "+err.error.message;
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        this.router.navigate(['update-offer']);
      }
    );
  }

  deleteOffer(offerId:number){
    console.log(offerId);
    this.getOrderService.deleteOffer(offerId).subscribe(
      (res:any)=>{
        console.log(res);
        this.showSnackbar = true;
        this.snackbarMessage = res;
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        this.router.navigate(['update-offer'])
      },(err:any)=>{
        console.log("err "+err.error.message);
        this.showSnackbar = true;
        this.snackbarMessage = err.error.message;
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        this.router.navigate(['update-offer']);
      }
    );
  }

  openSuboffer(suboffer:SubOffer){
    this.showForm1 = false;
    this.showForm2 = true;
    this.subofferForm.patchValue({
      subOfferId:suboffer.subOfferId,
      subOfferName:suboffer.subOfferName,
      price:suboffer.price,
      validity:suboffer.validity,
      parentRelation: suboffer.parentRelation
      }
    );
  }
  updateSubOffer(){
    this.subOfferforward.subOfferId = this.subofferForm.value.subOfferId;
    this.subOfferforward.subOfferName = this.subofferForm.value.subOfferName;
    this.subOfferforward.parentRelation = this.subofferForm.value.parentRelation;
    this.subOfferforward.price = this.subofferForm.value.price;
    this.subOfferforward.validity = this.subofferForm.value.validity;


    this.getOrderService.updateSubOffer(this.subOfferforward, this.subOfferforward.subOfferId).subscribe(
      (res:any)=>{
        console.log(res);
        this.closeSubofferForm();
        this.showSnackbar = true;
        this.snackbarMessage = 'Sub Offer Updated Successfully!';
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        this.router.navigate(['update-offer'])
      },(err:any)=>{
        console.log("err "+err.error.message);
        this.closeSubofferForm();
        this.showSnackbar = true;
        this.snackbarMessage = "Error Occurred "+err.error.message;
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        this.router.navigate(['update-offer']);
      }
    )
  }

  deleteSubOffer(subOfferId:number){
    this.getOrderService.deleteSubOffer(subOfferId).subscribe(
      (res:any)=>{
        console.log(res);
        this.showSnackbar = true;
        this.snackbarMessage = res;
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        this.router.navigate(['update-offer']);
      },(err:any)=>{
        console.log("err "+err.error.message);
        this.showSnackbar = true;
        this.snackbarMessage = err.error.message;
        setTimeout(() => {
          this.showSnackbar = false;
          this.snackbarMessage = '';
        }, 3000); // Hide the snackbar after 3 seconds
        this.router.navigate(['update-offer']);
      }
    )
  }
  // Inside your component class
closeOfferForm() {
  this.showForm1 = false;
}

closeSubofferForm() {
  this.showForm2 = false;
}


}
