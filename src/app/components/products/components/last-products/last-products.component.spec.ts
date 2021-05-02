import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastProductsComponent } from './last-products.component';

describe('LastProductsComponent', () => {
  let component: LastProductsComponent;
  let fixture: ComponentFixture<LastProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
