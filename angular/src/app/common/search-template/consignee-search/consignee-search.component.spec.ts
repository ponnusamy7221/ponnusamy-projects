import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeSearchComponent } from './consignee-search.component';

describe('ConsigneeSearchComponent', () => {
  let component: ConsigneeSearchComponent;
  let fixture: ComponentFixture<ConsigneeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsigneeSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsigneeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
