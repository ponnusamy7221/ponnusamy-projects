import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSearchComponent } from './warehouse-search.component';

describe('WarehouseSearchComponent', () => {
  let component: WarehouseSearchComponent;
  let fixture: ComponentFixture<WarehouseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarehouseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
