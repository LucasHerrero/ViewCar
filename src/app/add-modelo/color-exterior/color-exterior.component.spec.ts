import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorExteriorComponent } from './color-exterior.component';

describe('ColorExteriorComponent', () => {
  let component: ColorExteriorComponent;
  let fixture: ComponentFixture<ColorExteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorExteriorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorExteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
