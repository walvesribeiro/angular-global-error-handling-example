import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { CustomErrorHandler } from './app/custom-error-handler.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(
  AppComponent, {
    providers: [
      importProvidersFrom(BrowserAnimationsModule, HttpClientModule, MatSnackBarModule),
      {
        provide: ErrorHandler,
        useClass: CustomErrorHandler
      }
    ]
  }
)
  .catch(err => console.error(err));
