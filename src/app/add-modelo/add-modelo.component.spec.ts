import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModeloComponent } from './add-modelo.component';

describe('AddModeloComponent', () => {
  let component: AddModeloComponent;
  let fixture: ComponentFixture<AddModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
