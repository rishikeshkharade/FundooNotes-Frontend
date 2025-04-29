import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemiderDialogComponent } from './remider-dialog.component';

describe('RemiderDialogComponent', () => {
  let component: RemiderDialogComponent;
  let fixture: ComponentFixture<RemiderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemiderDialogComponent]
    });
    fixture = TestBed.createComponent(RemiderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
