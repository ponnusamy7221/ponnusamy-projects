import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCountryComponent } from './business-country.component';

describe('BusinessCountryComponent', () => {
  let component: BusinessCountryComponent;
  let fixture: ComponentFixture<BusinessCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
