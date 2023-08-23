import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOffersComponent } from './select-offers.component';

describe('SelectOffersComponent', () => {
  let component: SelectOffersComponent;
  let fixture: ComponentFixture<SelectOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectOffersComponent]
    });
    fixture = TestBed.createComponent(SelectOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
