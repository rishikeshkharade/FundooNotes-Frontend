import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/Note/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: any[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (res: any) => {
        console.log('Notes fetched successfully:', res);
        const allNotes = res.data || [];
        this.notes = allNotes.filter((note: { isArchive: number | boolean; isTrash: number | boolean; }) => (note.isArchive === 0 || note.isArchive === false) && (note.isTrash === 0 || note.isTrash === false)); 
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
      }
    });
  }

  addNote(newNote: any): void {
    this.notes.unshift(newNote);
    // this.getNotes(); // Refresh from backend to include correct isArchive
  }

  onNoteUpdated(updatedNote: any): void {
    console.log('Note updated:', updatedNote);
    this.getNotes(); 
  }
}
