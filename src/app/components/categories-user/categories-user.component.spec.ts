import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUserComponent } from './categories-user.component';

describe('CategoriesUserComponent', () => {
  let component: CategoriesUserComponent;
  let fixture: ComponentFixture<CategoriesUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
