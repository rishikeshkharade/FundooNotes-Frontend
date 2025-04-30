import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {
  private viewModeSubject = new BehaviorSubject<boolean>(false); // false = Grid, true = List
  viewMode$ = this.viewModeSubject.asObservable();

  setViewMode(isListView: boolean) {
    this.viewModeSubject.next(isListView);
  }
}
