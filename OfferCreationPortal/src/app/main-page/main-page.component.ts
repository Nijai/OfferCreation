import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private router: Router){}

  routeToaddOffer(){
    this.router.navigate(['/add-offer']);
  }
  routeToSelect(){
    this.router.navigate(['/select-offer']);
  }
  routeToUpdate(){
    this.router.navigate(['update-offer'])
  }
}
