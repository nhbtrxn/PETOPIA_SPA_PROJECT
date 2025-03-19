import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredSuccessfullyComponent } from './registered-successfully.component';

describe('RegisteredSuccessfullyComponent', () => {
  let component: RegisteredSuccessfullyComponent;
  let fixture: ComponentFixture<RegisteredSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredSuccessfullyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
