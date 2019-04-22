import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeDeliveryComponent } from './subscribe-delivery.component';

describe('SubscribeDeliveryComponent', () => {
  let component: SubscribeDeliveryComponent;
  let fixture: ComponentFixture<SubscribeDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
