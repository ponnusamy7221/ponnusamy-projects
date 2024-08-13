import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingCategoryComponent } from './packing-category.component';

describe('PackingCategoryComponent', () => {
  let component: PackingCategoryComponent;
  let fixture: ComponentFixture<PackingCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackingCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
