import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesitinationSearchComponent } from './desitination-search.component';

describe('DesitinationSearchComponent', () => {
  let component: DesitinationSearchComponent;
  let fixture: ComponentFixture<DesitinationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesitinationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesitinationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
