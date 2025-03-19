import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogProductComponent } from './dog-product.component';

describe('DogProductComponent', () => {
  let component: DogProductComponent;
  let fixture: ComponentFixture<DogProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
