import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoListItemComponent } from './auto-list-item.component';

describe('AutoListItemComponent', () => {
  let component: AutoListItemComponent;
  let fixture: ComponentFixture<AutoListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
