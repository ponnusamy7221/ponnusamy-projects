import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPackingComponent } from './final-packing.component';

describe('FinalPackingComponent', () => {
  let component: FinalPackingComponent;
  let fixture: ComponentFixture<FinalPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalPackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
