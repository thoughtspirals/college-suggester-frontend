import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormSectionComponent } from './input-form-section.component';

describe('InputFormSectionComponent', () => {
  let component: InputFormSectionComponent;
  let fixture: ComponentFixture<InputFormSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFormSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
