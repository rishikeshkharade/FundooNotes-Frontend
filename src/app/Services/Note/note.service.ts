import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';  
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly getNotesUrl = '/getNotes';  
  private readonly createNoteUrl = '/createNote'; 
  private readonly archiveNoteUrl = '/archiveNote' 

  constructor(private httpService: HttpService) {}

  // returns the full response object
  getNotes(): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.getApi<any>(this.getNotesUrl, headers);
  }

  createNote(note: any): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.postApi<any>(this.createNoteUrl, note, headers);
  }

  archiveNote(noteId: number): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.putApi<any>(`${this.archiveNoteUrl}?NoteId=${noteId}`, {}, headers);
  }

  trashNote(noteId: number): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.putApi<any>(`/noteInTrash?NoteId=${noteId}`, {}, headers);
  }

  restoreNote(noteId: number): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.putApi<any>(`/noteInTrash?NoteId=${noteId}`, { isTrash: 0 }, headers);
  }
  

  deleteNoteForever(noteId: number): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.deleteApi<any>(`/deleteNote?NoteId=${noteId}`, headers);
  }

  addReminder(noteId: number, reminderDateTime: string): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.putApi<any>(`/notesReminder?NoteId=${noteId}&Reminder=${reminderDateTime}`, {}, headers);
  }

  getAllLabels(): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.getApi<any>('/getAllLabels', headers);
  }
  
  assignLabelToNote(noteId: number, labelId: number): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.postApi<any>(`/assignLabelToNote?NoteId=${noteId}&LabelId=${labelId}`, {}, headers);
  }  

  updateNote(noteId: number, updateData: any): Observable<any> {
    const headers = this.httpService.getHeader();
    return this.httpService.putApi<any>(`/updateNote?NoteId=${noteId}`, updateData, headers);
  }
}