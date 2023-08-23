import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Offer } from '../Offer';
import { Router } from '@angular/router';
import { GetOrderService } from '../service/get-order.service';
import { CustomDate } from '../CustomDate';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  offerForm: FormGroup;
  subofferForm: FormGroup;
  showForm1: boolean = true;
  form1Data: any[] = [];
  form2Data: any[] = [];
  offer: Offer;
  
  constructor(private fb: FormBuilder,private router: Router,private getOrderService:GetOrderService) {
    this.offer = new Offer();
    this.offerForm = this.fb.group({
      offerName: ['',  [Validators.required, this.offerNameValidator]],
      offerDescription: ['', Validators.required],
      offerType: ['', Validators.required],
      activationDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });

    this.subofferForm = this.fb.group({
      subOfferName:['', [Validators.required, this.subofferNameValidator]],
      price:['', Validators.required],
      validity:['', Validators.compose([Validators.required, this.validityValidator])],
      parentRelation: ['', Validators.required]
      }
    );
  }

  onSubmit() {
    if (this.offerForm.valid) {
      this.showForm1 = false;
      this.form1Data = this.offerForm.value;
      // console.log(this.form1Data);
    }
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



  next(){
    if(this.offerForm.valid){
      this.showForm1 = false;
    }
  }

  addSuboffer() {
    if (this.subofferForm.valid) {
      console.log(this.form2Data);
      this.form2Data.push(this.subofferForm.value);
      this.subofferForm.reset();
    }
  }
  back(){
    this.showForm1 = true;
  }

  finish() {
    // this.form1Data.push(this.offerForm.value;
    if(this.subofferForm.valid){
      this.form2Data.push(this.subofferForm.value);

    this.offer.offerName = this.offerForm.value.offerName??'';
    this.offer.offerDescription = this.offerForm.value.offerDescription??'';
    this.offer.offerType = this.offerForm.value.offerType??'';
    this.offer.activationDate = this.offerForm.value.activationDate??'';
    this.offer.expirationDate = this.offerForm.value.expirationDate??'';
    this.offer.subOffers = this.form2Data??[];

    const serializedData = JSON.stringify(this.offerForm.value.expirationDate);
    console.log(serializedData);
    
    console.log(this.offer);
    this.getOrderService.addOffer(this.offer).subscribe(
      (res:any)=>{
        console.log("res: "+res);
        this.router.navigate([''],{replaceUrl:true});
      },(err:any)=>{
        console.log(err);
        console.error('An error occurred:', err);
      if (err.error instanceof ErrorEvent) {
        // Client-side error
        console.error('Client-side error:', err.error.message);
      } else {
        // Server-side error
        console.error('Server-side error:', err.error);
      }
      }
    );
    }
    
  }


}
