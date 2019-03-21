import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WingWiseReportComponent } from './wing-wise-report.component';

describe('WingWiseReportComponent', () => {
  let component: WingWiseReportComponent;
  let fixture: ComponentFixture<WingWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WingWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WingWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
