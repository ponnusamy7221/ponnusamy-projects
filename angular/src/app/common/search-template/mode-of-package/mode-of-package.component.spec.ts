import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeOfPackageComponent } from './mode-of-package.component';

describe('ModeOfPackageComponent', () => {
  let component: ModeOfPackageComponent;
  let fixture: ComponentFixture<ModeOfPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeOfPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeOfPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
