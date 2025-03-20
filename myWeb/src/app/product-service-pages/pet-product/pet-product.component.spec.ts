import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetProductComponent } from './pet-product.component';

describe('PetProductComponent', () => {
  let component: PetProductComponent;
  let fixture: ComponentFixture<PetProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
