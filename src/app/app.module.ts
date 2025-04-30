import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// These are Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule} from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';



// app modules
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { DisplayNoteComponent } from './Components/notes/display-note/display-note.component';
import { IconComponent } from './Components/notes/icon/icon.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreateNoteComponent } from './Components/notes/create-note/create-note.component';
import { ArchiveComponent } from './Components/archive/archive.component';
import { NotesComponent } from './Components/notes/notes/notes.component';
import { TrashComponent } from './Components/trash/trash.component';
import { ConfirmDeleteDialogComponent } from './Components/confirm-delete-dialog/confirm-delete-dialog.component';
import { RemiderDialogComponent } from './Components/notes/remider-dialog/remider-dialog.component';
import { UpdateNoteDialogComponent } from './Components/notes/update-note-dialog/update-note-dialog.component';



@NgModule({
  declarations: [
    AppComponent, RegisterComponent, LoginComponent, routingComponents, IconComponent, DisplayNoteComponent, DashboardComponent, CreateNoteComponent, ArchiveComponent, NotesComponent, TrashComponent, ConfirmDeleteDialogComponent, RemiderDialogComponent, UpdateNoteDialogComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    
    // Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
