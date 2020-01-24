import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustmerComponent } from './new-custmer.component';

describe('NewCustmerComponent', () => {
  let component: NewCustmerComponent;
  let fixture: ComponentFixture<NewCustmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
