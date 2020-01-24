import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourTasksComponent } from './tour-tasks.component';

describe('TourTasksComponent', () => {
  let component: TourTasksComponent;
  let fixture: ComponentFixture<TourTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
