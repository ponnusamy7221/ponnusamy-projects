import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchedThroughComponent } from './dispatched-through.component';

describe('DispatchedThroughComponent', () => {
  let component: DispatchedThroughComponent;
  let fixture: ComponentFixture<DispatchedThroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispatchedThroughComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DispatchedThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
