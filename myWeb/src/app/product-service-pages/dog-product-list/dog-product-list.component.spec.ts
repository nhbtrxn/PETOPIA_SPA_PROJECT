import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogProductListComponent } from './dog-product-list.component';

describe('DogProductListComponent', () => {
  let component: DogProductListComponent;
  let fixture: ComponentFixture<DogProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
