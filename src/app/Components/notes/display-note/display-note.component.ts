import { NgIfContext } from '@angular/common';
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NoteService } from 'src/app/Services/Note/note.service';
import { MatDialog } from '@angular/material/dialog';
import { RemiderDialogComponent } from '../remider-dialog/remider-dialog.component';
import { UpdateNoteDialogComponent } from '../update-note-dialog/update-note-dialog.component';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent {
  @Input() note: any;
  @Input() isTrashView: boolean = false;
  @Output() noteUpdated = new EventEmitter<any>();
  @Output() restoreClicked = new EventEmitter<number>();
  @Output() deleteForeverClicked = new EventEmitter<number>();
  trashActions!: TemplateRef<NgIfContext<boolean>> | null;

  constructor(private noteService: NoteService, private dialog: MatDialog) {}

  archiveNote(): void {
    this.noteService.archiveNote(this.note.notesId).subscribe({
      next: (res: any) => {
        console.log('Note archived/unarchived successfully:', res);
        this.note.isArchive = !this.note.isArchive;
        this.noteUpdated.emit(this.note);  // send updated note
      },
      error: (err) => {
        console.error('Error archiving/unarchiving note:', err);
      }
    });
  }

  deleteNote(): void {
    this.noteService.trashNote(this.note.notesId).subscribe({
      next: (res: any) => {
        console.log('Note moved to Trash:', res);
        this.noteUpdated.emit(this.note); // notify NotesComponent to refresh
      },
      error: (err) => {
        console.error('Error deleting note:', err);
      }
    });
  }
  
  restoreNote() {
    this.restoreClicked.emit(this.note.notesId);
  }
  
  deleteForever() {
    this.deleteForeverClicked.emit(this.note.notesId);
  }

  openReminderDialog() {
    const dialogRef = this.dialog.open(RemiderDialogComponent, {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(reminderDateTime => {
      if (reminderDateTime) {
        console.log('Reminder selected:', reminderDateTime);
        this.addReminder(reminderDateTime);
      }
    });
  }
  
  addReminder(reminderDateTime: string) {
    this.noteService.addReminder(this.note.notesId, reminderDateTime).subscribe({
      next: () => {
        console.log('Reminder added successfully!');
        this.note.reminder = reminderDateTime;
        // Refresh notes if you want
      },
      error: (err) => {
        console.error('Error adding reminder:', err);
      }
    });
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateNoteDialogComponent, {
      width: '400px',
      data: { note: this.note }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        console.log('Note updated!');
        this.noteUpdated.emit();
      }
    });
  }
}
