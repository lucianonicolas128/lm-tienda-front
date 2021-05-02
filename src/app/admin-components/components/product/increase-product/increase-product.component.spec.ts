import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseProductComponent } from './increase-product.component';

describe('IncreaseProductComponent', () => {
  let component: IncreaseProductComponent;
  let fixture: ComponentFixture<IncreaseProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreaseProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
