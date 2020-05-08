import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAllHeaderComponent } from './select-all-header.component';

describe('SelectAllHeaderComponent', () => {
  let component: SelectAllHeaderComponent;
  let fixture: ComponentFixture<SelectAllHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAllHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAllHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
