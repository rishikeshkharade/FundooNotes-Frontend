import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelEditDialogComponent } from './label-edit-dialog.component';

describe('LabelEditDialogComponent', () => {
  let component: LabelEditDialogComponent;
  let fixture: ComponentFixture<LabelEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelEditDialogComponent]
    });
    fixture = TestBed.createComponent(LabelEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
