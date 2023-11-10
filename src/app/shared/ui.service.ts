import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private matSnackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string | undefined, config: MatSnackBarConfig) {
    this.matSnackBar.open(message, action, config);
  }
}