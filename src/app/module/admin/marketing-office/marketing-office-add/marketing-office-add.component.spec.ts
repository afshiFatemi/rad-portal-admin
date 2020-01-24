import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingOfficeAddComponent } from './marketing-office-add.component';

describe('MarketingOfficeAddComponent', () => {
  let component: MarketingOfficeAddComponent;
  let fixture: ComponentFixture<MarketingOfficeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingOfficeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingOfficeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
