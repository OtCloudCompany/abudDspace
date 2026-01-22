import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcLicenseComponent } from './cc-license.component';

describe('CcLicenseComponent', () => {
  let component: CcLicenseComponent;
  let fixture: ComponentFixture<CcLicenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CcLicenseComponent]
    });
    fixture = TestBed.createComponent(CcLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
