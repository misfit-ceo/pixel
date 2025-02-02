import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreeDViewerComponent } from './three-d-viewer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ThreeDViewerComponent', () => {
  let component: ThreeDViewerComponent;
  let fixture: ComponentFixture<ThreeDViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDViewerComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ] // Prevent errors for unknown elements (if any)
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
