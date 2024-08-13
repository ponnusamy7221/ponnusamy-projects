import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutInvoiceComponent } from './without-invoice.component';

describe('WithoutInvoiceComponent', () => {
  let component: WithoutInvoiceComponent;
  let fixture: ComponentFixture<WithoutInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithoutInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
