import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatProductComponent } from './cat-product.component';

describe('CatProductComponent', () => {
  let component: CatProductComponent;
  let fixture: ComponentFixture<CatProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
