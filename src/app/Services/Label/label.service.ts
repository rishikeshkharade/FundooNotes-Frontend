import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  
  private baseUrl = 'https://localhost:44373';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  createLabel(labelName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/createLabel?createlabel=${labelName}`, null, {
      headers: this.getAuthHeaders()
    });
  }

  getAllLabels(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllLabels`, {
      headers: this.getAuthHeaders()
    });
  }

  // For future use
  assignLabelToNote(noteId: number, labelId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/assignLabelToNote?NoteId=${noteId}&LabelId=${labelId}`, null, {
      headers: this.getAuthHeaders()
    });
  }

  removeLabelFromNote(noteId: number, labelId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/removeLabelFromNote?NoteId=${noteId}&LabelId=${labelId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
