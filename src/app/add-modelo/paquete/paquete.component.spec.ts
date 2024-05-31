import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteComponent } from './paquete.component';

describe('PaqueteComponent', () => {
  let component: PaqueteComponent;
  let fixture: ComponentFixture<PaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaqueteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
