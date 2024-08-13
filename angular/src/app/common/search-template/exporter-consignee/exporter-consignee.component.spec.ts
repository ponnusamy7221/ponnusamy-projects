import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporterConsigneeComponent } from './exporter-consignee.component';

describe('ExporterConsigneeComponent', () => {
  let component: ExporterConsigneeComponent;
  let fixture: ComponentFixture<ExporterConsigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExporterConsigneeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExporterConsigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
