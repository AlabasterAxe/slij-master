import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XorComponent } from './xor.component';

describe('XorComponent', () => {
  let component: XorComponent;
  let fixture: ComponentFixture<XorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
