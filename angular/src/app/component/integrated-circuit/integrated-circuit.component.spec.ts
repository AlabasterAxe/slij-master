import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratedCircuitComponent } from './integrated-circuit.component';

describe('IntegratedCircuitComponent', () => {
  let component: IntegratedCircuitComponent;
  let fixture: ComponentFixture<IntegratedCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegratedCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegratedCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
