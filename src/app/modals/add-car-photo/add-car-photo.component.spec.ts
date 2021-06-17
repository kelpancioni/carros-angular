import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarPhotoComponent } from './add-car-photo.component';

describe('AddCarPhotoComponent', () => {
  let component: AddCarPhotoComponent;
  let fixture: ComponentFixture<AddCarPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
