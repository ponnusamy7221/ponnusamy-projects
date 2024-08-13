import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPartyComponent } from './search-party.component';

describe('SearchPartyComponent', () => {
  let component: SearchPartyComponent;
  let fixture: ComponentFixture<SearchPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPartyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
