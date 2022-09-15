import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandler implements ErrorHandler {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}

  handleError(error: unknown) {
    this.zone.run(() => {
      this.snackbar.open('Um erro foi detectado!', 'Fechar', {
        duration: 2000,
      });
    });
    console.warn('ocorreu um erro: ', error);
  }
}
