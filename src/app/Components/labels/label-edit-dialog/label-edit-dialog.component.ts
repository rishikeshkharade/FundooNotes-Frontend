import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelService } from 'src/app/Services/Label/label.service';

@Component({
  selector: 'app-label-edit-dialog',
  templateUrl: './label-edit-dialog.component.html',
  styleUrls: ['./label-edit-dialog.component.scss']
})
export class LabelEditDialogComponent implements OnInit {
  labels: any[] = [];
  newLabel: string = '';

  constructor(
    private labelService: LabelService,
    private dialogRef: MatDialogRef<LabelEditDialogComponent>
  ) {}

  ngOnInit(): void {
    this.fetchLabels();
  }

  fetchLabels(): void {
    this.labelService.getAllLabels().subscribe({
      next: (res) => {
        this.labels = res.data;
      },
      error: (err) => {
        console.error('Error fetching labels:', err);
      }
    });
  }

  createLabel(): void {
    if (!this.newLabel.trim()) return;
    this.labelService.createLabel(this.newLabel).subscribe({
      next: (res) => {
        this.labels.push(res.data);
        this.newLabel = '';
      },
      error: (err) => {
        console.error('Error creating label:', err);
      }
    });
  }

  deleteLabel(labelId: number): void {
    this.labels = this.labels.filter(label => label.labelId !== labelId);
    // Call API if backend deletion is added later
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
