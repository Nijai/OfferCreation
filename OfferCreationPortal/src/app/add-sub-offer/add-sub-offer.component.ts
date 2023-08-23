import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sub-offer',
  templateUrl: './add-sub-offer.component.html',
  styleUrls: ['./add-sub-offer.component.css']
})
export class AddSubOfferComponent {
  subofferForm: FormGroup;
  form2Data: any[] = [];
  constructor(private fb: FormBuilder) {
    this.subofferForm = this.fb.group({
      subOfferName:['', [Validators.required, this.subofferNameValidator]],
      price:['', Validators.required],
      validity:['', Validators.compose([Validators.required, this.validityValidator])],
      parentRelation: ['', Validators.required]
      }
    );
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


  addSuboffer() {
    if (this.subofferForm.valid) {
      this.form2Data.push(this.subofferForm.value);
      this.subofferForm.reset();
    }
  }
  isInvalid(controlName: string) {
    const control = this.subofferForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  finish() {
    this.subofferForm.reset();
  }
  back(){
    
  }
}
