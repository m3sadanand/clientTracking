import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTripsComponent } from './open-trips.component';

describe('OpenTripsComponent', () => {
  let component: OpenTripsComponent;
  let fixture: ComponentFixture<OpenTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
