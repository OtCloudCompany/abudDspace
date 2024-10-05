import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationModalComponent } from './citation-modal.component';

describe('CitationModalComponent', () => {
  let component: CitationModalComponent;
  let fixture: ComponentFixture<CitationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitationModalComponent]
    });
    fixture = TestBed.createComponent(CitationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
