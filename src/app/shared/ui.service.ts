import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class UIService {

  constructor(private matSnackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string | undefined, config: MatSnackBarConfig) {
    this.matSnackBar.open(message, action, config);
  }
}