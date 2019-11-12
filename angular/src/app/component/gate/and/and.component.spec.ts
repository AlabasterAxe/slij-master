import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AndComponent } from "./and.component";

describe("AndComponent", () => {
  let component: AndComponent;
  let fixture: ComponentFixture<AndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AndComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
