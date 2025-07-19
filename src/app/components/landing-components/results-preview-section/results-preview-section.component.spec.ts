import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPreviewSectionComponent } from './results-preview-section.component';

describe('ResultsPreviewSectionComponent', () => {
  let component: ResultsPreviewSectionComponent;
  let fixture: ComponentFixture<ResultsPreviewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsPreviewSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsPreviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
