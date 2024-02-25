import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { delay, finalize, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  canView = true;
  canEdit = false;
  laoding = false;

  name = new FormControl();

  ngOnInit(): void {
    if (!this.canView) return;
    if (!this.canEdit) this.name.disable();

    this.fetchData();
  }

  private fetchData() {
    this.startLoading();
    return of('ME')
      .pipe(finalize(() => this.stopLoading()))
      .subscribe((me) => this.name.reset(me, { emitEvent: false }));
  }

  private startLoading() {
    this.laoding = true;
    this.name.disable({ emitEvent: false });
  }

  private stopLoading() {
    this.laoding = false;
    if (this.canEdit) this.name.enable({ emitEvent: false });
  }
}

