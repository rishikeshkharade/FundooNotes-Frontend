import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/Note/note.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashedNotes: any[] = [];

  constructor(private noteService: NoteService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getTrashedNotes();
  }

  getTrashedNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (res: any) => {
        this.trashedNotes = res.data.filter((note: { isTrash: number | boolean; }) => (note.isTrash === 1 || note.isTrash === true));
      }
    });
  }
  
  onDeleteForever(noteId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    this.noteService.deleteNoteForever(noteId).subscribe({
      next: () => {
        console.log('Note deleted forever successfully!');
        this.getTrashedNotes(); // Refresh
         this.snackBar.open('Note deleted forever', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
      },
      error: (err: any) => {
        console.error('Error deleting note forever:', err);
      }
    });
  } else {
    console.log('Delete cancelled');
  }
});
  }

  onRestore(noteId: number): void {
    this.noteService.restoreNote(noteId).subscribe({
      next: () => {
        console.log('Note restored successfully!');
        this.getTrashedNotes(); // Refresh list after restoring
        this.snackBar.open('Note restored successfully', 'Close', {
        duration: 3000, 
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
        });
        },
      error: (err: any) => {
        console.error('Error restoring note:', err);
      }
    });
  }
  
}
