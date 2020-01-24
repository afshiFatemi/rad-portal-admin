import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingOfficeEditComponent } from './marketing-office-edit.component';

describe('MarketingOfficeEditComponent', () => {
  let component: MarketingOfficeEditComponent;
  let fixture: ComponentFixture<MarketingOfficeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingOfficeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingOfficeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
