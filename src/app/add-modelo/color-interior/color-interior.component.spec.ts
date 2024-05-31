import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorInteriorComponent } from './color-interior.component';

describe('ColorInteriorComponent', () => {
  let component: ColorInteriorComponent;
  let fixture: ComponentFixture<ColorInteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorInteriorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorInteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
