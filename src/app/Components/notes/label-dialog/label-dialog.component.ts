import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/Services/Note/note.service';


@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss']
})
export class LabelDialogComponent implements OnInit {
  labels: any[] = [];
  selectedLabels: number[] = [];

  constructor(
    private noteService: NoteService,
    public dialogRef: MatDialogRef<LabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { noteId: number }
  ) {}

  ngOnInit(): void {
    this.fetchLabels();
  }

  fetchLabels(): void {
    this.noteService.getAllLabels().subscribe({
      next: (res: any) => {
        this.labels = res.data;
      },
      error: (err) => {
        console.error('Error fetching labels:', err);
      }
    });
  }

  toggleLabel(labelId: number): void {
    const index = this.selectedLabels.indexOf(labelId);
    if (index > -1) {
      this.selectedLabels.splice(index, 1);
    } else {
      this.selectedLabels.push(labelId);
    }
  }

  saveLabels(): void {
    this.selectedLabels.forEach(labelId => {
      this.noteService.assignLabelToNote(this.data.noteId, labelId).subscribe({
        next: () => {
          console.log(`Label ${labelId} assigned successfully!`);
        },
        error: (err) => {
          console.error(`Error assigning label ${labelId}:`, err);
        }
      });
    });
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
