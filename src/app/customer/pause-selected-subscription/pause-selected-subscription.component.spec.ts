import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseSelectedSubscriptionComponent } from './pause-selected-subscription.component';

describe('PauseSelectedSubscriptionComponent', () => {
  let component: PauseSelectedSubscriptionComponent;
  let fixture: ComponentFixture<PauseSelectedSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseSelectedSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseSelectedSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
