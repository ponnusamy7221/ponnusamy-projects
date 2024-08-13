import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RePackingComponent } from './re-packing.component';

describe('RePackingComponent', () => {
  let component: RePackingComponent;
  let fixture: ComponentFixture<RePackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RePackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RePackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
