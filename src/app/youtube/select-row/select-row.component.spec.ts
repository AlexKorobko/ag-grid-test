import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRowComponent } from './select-row.component';

describe('SelectRowComponent', () => {
  let component: SelectRowComponent;
  let fixture: ComponentFixture<SelectRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectRowComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
