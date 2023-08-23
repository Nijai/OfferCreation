import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubOfferComponent } from './add-sub-offer.component';

describe('AddSubOfferComponent', () => {
  let component: AddSubOfferComponent;
  let fixture: ComponentFixture<AddSubOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubOfferComponent]
    });
    fixture = TestBed.createComponent(AddSubOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
