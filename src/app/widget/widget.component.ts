import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Task } from '../task.model';
import { WidgetDataService } from './widget-data.service';
import { WidgetErrorComponent } from './widget-error/widget-error.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    WidgetErrorComponent,
  ],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  error: Error | null = null;

  constructor(private widgetData: WidgetDataService) {}

  ngOnInit(): void {
    this.tasks$ = this.widgetData.load().pipe(
      map((data) => {
        console.log('Data transformation...');
        return data.map((data) => data);
      }),
      tap({
        error: (error) => {
          console.log(
            'Atualizou o componente de erro e exibiu o banner de erro...'
          );
          this.error = error;
        },
      }),
      catchError((error) => {
        console.log('Trocou o observable com falha por um array vazio...');

        return of([]);
      })
    );
  }

  addTask() {
    // unreliable method
    try {
      setTimeout(() => {
        this.widgetData.addTaskSync({ id: 0, title: 'New Task' });
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
        throw error;
      }
    }
  }
}
