import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/Note/note.service';
import { SearchService } from 'src/app/Services/Search/search.service';
import { RefreshService } from 'src/app/Services/Refresh/refresh.service';
import { ViewModeService } from 'src/app/Services/ViewMode/view-mode.service';




@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  originalNotes: any[] = [];
  @Input() isListView = false;

  constructor(private noteService: NoteService, private searchService: SearchService, private refreshService: RefreshService, private viewModeService: ViewModeService) {}

  ngOnInit(): void {
    this.getNotes();
    this.searchService.searchQuery$.subscribe(query => {
      this.applySearchFilter(query);
    });
    this.refreshService.refresh$.subscribe(() => {
      this.getNotes(); // Fetch notes again when refresh triggered
    });
    this.viewModeService.viewMode$.subscribe((isList: boolean) => {
      this.isListView = isList;
    });
  }
  
  

  getNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (res: any) => {
        console.log('Notes fetched successfully:', res);
  
        if (res && res.data) {
          const allNotes = res.data;
  
          const filteredNotes = allNotes.filter((note: any) =>
            (note.isArchive === 0 || note.isArchive === false) &&
            (note.isTrash === 0 || note.isTrash === false)
          );
  
          this.notes = filteredNotes;
          this.originalNotes = filteredNotes;
        } else {
          console.warn('No notes available');
          this.notes = [];
          this.originalNotes = [];
        }
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

  applySearchFilter(query: string): void {
    if (!query) {
      this.notes = [...this.originalNotes];
      return;
    }
    const lowerQuery = query.toLowerCase();
    this.notes = this.originalNotes.filter((note: any) => 
      (note.title && note.title.toLowerCase().includes(lowerQuery)) ||
      (note.description && note.description.toLowerCase().includes(lowerQuery))
    );
  }
}
