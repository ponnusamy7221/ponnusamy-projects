import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderNewComponent } from './pre-order-new.component';

describe('PreOrderNewComponent', () => {
  let component: PreOrderNewComponent;
  let fixture: ComponentFixture<PreOrderNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreOrderNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreOrderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
