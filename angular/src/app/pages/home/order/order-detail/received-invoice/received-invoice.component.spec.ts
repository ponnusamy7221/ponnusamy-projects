import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedInvoiceComponent } from './received-invoice.component';

describe('ReceivedInvoiceComponent', () => {
  let component: ReceivedInvoiceComponent;
  let fixture: ComponentFixture<ReceivedInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivedInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceivedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
