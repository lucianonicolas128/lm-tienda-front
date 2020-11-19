import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSliderComponent } from './admin-add-slider.component';

describe('AdminAddSliderComponent', () => {
  let component: AdminAddSliderComponent;
  let fixture: ComponentFixture<AdminAddSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
