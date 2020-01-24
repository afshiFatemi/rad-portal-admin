import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristListTaskComponent } from './tourist-list-task.component';

describe('TouristListTaskComponent', () => {
  let component: TouristListTaskComponent;
  let fixture: ComponentFixture<TouristListTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristListTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristListTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
