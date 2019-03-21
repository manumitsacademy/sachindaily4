import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatWiseReportComponent } from './flat-wise-report.component';

describe('FlatWiseReportComponent', () => {
  let component: FlatWiseReportComponent;
  let fixture: ComponentFixture<FlatWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
