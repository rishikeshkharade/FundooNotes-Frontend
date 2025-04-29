import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/Note/note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  archivedNotes: any[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.getArchivedNotes();
  }

  getArchivedNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (res) => {
        console.log('All Notes fetched successfully:', res);
        const allNotes = res.data || [];
        this.archivedNotes = allNotes.filter((note: { isArchive: number | boolean }) => (note.isArchive === 1 || note.isArchive === true));
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
      }
    });
  }
}
