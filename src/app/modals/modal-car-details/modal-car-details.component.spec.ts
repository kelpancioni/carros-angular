import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarDetailsComponent } from './modal-car-details.component';

describe('ModalCarDetailsComponent', () => {
  let component: ModalCarDetailsComponent;
  let fixture: ComponentFixture<ModalCarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCarDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
