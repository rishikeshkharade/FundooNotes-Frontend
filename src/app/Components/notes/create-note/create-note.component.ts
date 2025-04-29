import { Component, EventEmitter, Output } from '@angular/core';
import { NoteService } from '../../../Services/Note/note.service'; 

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {
  title = '';
  description = '';
  isExpanded = false;

  @Output() createNoteEvent = new EventEmitter<any>();

  constructor(private noteService: NoteService) {}

  expandNote() {
    this.isExpanded = true;
  }

  closeNote() {
    if(this.title || this.description){
      this.createNote();
    }
    this.isExpanded = false;
    this.title = '';
    this.description = '';
  }

  createNote(isArchive: boolean = false) {
    if (this.title || this.description) {
      const newNote = {
        title: this.title,
        description: this.description,
        color: '#fff',
        isArchive: isArchive
      };
  
      this.noteService.createNote(newNote).subscribe(() => {
        this.createNoteEvent.emit(newNote);
      });
    }
  }

  archiveNote() {
    this.createNote(true); // Call createNote with archive flag
    this.isExpanded = false;
    this.title = '';
    this.description = '';
  }
  
  
}
