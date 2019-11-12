import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorComponent } from './nor.component';

describe('NorComponent', () => {
  let component: NorComponent;
  let fixture: ComponentFixture<NorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
