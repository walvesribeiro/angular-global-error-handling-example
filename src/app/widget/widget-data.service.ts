import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { Task } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class WidgetDataService {
  constructor(private http: HttpClient) {}

  load() {
    return this.http
      .get<Task[]>(
        `https://jsonplaceholder.typicode.com/todosa?_start=0&_limit=3`
      )
      .pipe(
        catchError(() => {
          console.log('Erro na requisição do serviço de tasks');
          return throwError(
            () => new Error('Erro ao receber os dados das tasks')
          );
        })
      );
  }

  addTaskSync(task: Task): Task | never {
    if (task.id === 0) {
      throw Error(`Value zero (0) is not allowed as a task id`);
    }
    return task;
  }
}
