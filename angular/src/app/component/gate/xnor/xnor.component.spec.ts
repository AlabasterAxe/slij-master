import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XnorComponent } from './xnor.component';

describe('XnorComponent', () => {
  let component: XnorComponent;
  let fixture: ComponentFixture<XnorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XnorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XnorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
