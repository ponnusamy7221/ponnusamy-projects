import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentControlComponent } from './attachment-control.component';

describe('AttachmentControlComponent', () => {
  let component: AttachmentControlComponent;
  let fixture: ComponentFixture<AttachmentControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttachmentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
