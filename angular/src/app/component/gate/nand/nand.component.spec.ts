import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NandComponent } from './nand.component';

describe('NandComponent', () => {
  let component: NandComponent;
  let fixture: ComponentFixture<NandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
