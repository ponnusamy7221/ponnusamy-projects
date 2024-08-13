import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagenoDescriptionComponent } from './packageno-description.component';

describe('PackagenoDescriptionComponent', () => {
  let component: PackagenoDescriptionComponent;
  let fixture: ComponentFixture<PackagenoDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagenoDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagenoDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
