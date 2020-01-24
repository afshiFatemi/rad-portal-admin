import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingOfficeListComponent } from './marketing-office-list.component';

describe('MarketingOfficeListComponent', () => {
  let component: MarketingOfficeListComponent;
  let fixture: ComponentFixture<MarketingOfficeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingOfficeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingOfficeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
