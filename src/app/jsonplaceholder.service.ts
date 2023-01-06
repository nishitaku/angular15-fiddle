import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class JsonplaceholderService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`);
  }

  getTodosByUserId(userId: string): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(
        `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
      )
      .pipe(delay(Math.floor(Math.random() * 2000)));
  }

  fetchTodosByUserId(userId: string): Promise<Todo[]> {
    return this.delayFetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
      { delay: Math.floor(Math.random() * 2000) }
    ).then((response) => {
      return response.json();
    });
  }

  delayFetch: (url: any, options: any) => Promise<any> = (
    url: any,
    options: any
  ) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetch(url, options));
      }, options.delay);
    });
}
