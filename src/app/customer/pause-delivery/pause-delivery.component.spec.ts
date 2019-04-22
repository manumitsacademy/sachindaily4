import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseDeliveryComponent } from './pause-delivery.component';

describe('PauseDeliveryComponent', () => {
  let component: PauseDeliveryComponent;
  let fixture: ComponentFixture<PauseDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
