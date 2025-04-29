import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-remider-dialog',
  templateUrl: './remider-dialog.component.html',
  styleUrls: ['./remider-dialog.component.scss']
})
export class RemiderDialogComponent {
  selectedDate: Date | null = null;
  selectedTime: string = '';

  constructor(public dialogRef: MatDialogRef<RemiderDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.selectedDate && this.selectedTime) {
      const dateTimeString = `${this.selectedDate.toISOString().split('T')[0]}T${this.selectedTime}`;
      this.dialogRef.close(dateTimeString);
    } else {
      alert('Please select date and time');
    }
  }
}
