import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditSliderComponent } from './admin-edit-slider.component';

describe('AdminEditSliderComponent', () => {
  let component: AdminEditSliderComponent;
  let fixture: ComponentFixture<AdminEditSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
