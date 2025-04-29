import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/Services/Note/note.service';
import { MatDialog } from '@angular/material/dialog';
import { RemiderDialogComponent } from '../remider-dialog/remider-dialog.component';

@Component({
  selector: 'app-update-note-dialog',
  templateUrl: './update-note-dialog.component.html',
  styleUrls: ['./update-note-dialog.component.scss']
})
export class UpdateNoteDialogComponent {
  title: string;
  description: string;
  reminder: string;
  colour: string;
  isArchive: boolean;
  isPin: boolean;
  isTrash: boolean;

  showColorPalette = false;
  colors: string[] = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', 
    '#d7aefb', '#fdcfe8'
  ];

  constructor(
    private noteService: NoteService,
    public dialogRef: MatDialogRef<UpdateNoteDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.note.title;
    this.description = data.note.description;
    this.reminder = data.note.reminder;
    this.colour = data.note.Colour;
    this.isArchive = data.note.isArchive;
    this.isPin = data.note.isPin;
    this.isTrash = data.note.isTrash;
  }

  closeDialog(): void {
    const updatedData = {
      title: this.title,
      description: this.description,
      reminder: this.reminder,
      colour: this.colour,
      image: null, 
      isArchive: this.isArchive,
      isPin: this.isPin,
      isTrash: this.isTrash
    };

    this.noteService.updateNote(this.data.note.notesId, updatedData).subscribe({
      next: () => {
        console.log('Note updated successfully!');
      },
      error: (err) => {
        console.error('Error updating note:', err);
      }
    });

    this.dialogRef.close('updated');
  }

  toggleColorPalette(): void {
    this.showColorPalette = !this.showColorPalette;
  }

  openReminderDialog(): void {
    const dialogRef = this.dialog.open(RemiderDialogComponent, {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(reminderDateTime => {
      if (reminderDateTime) {
        this.reminder = reminderDateTime;
        console.log('Reminder set:', this.reminder);
      }
    });
  }
  
  changeColor(colorCode: string): void {
    this.colour = colorCode;
  }  
}
