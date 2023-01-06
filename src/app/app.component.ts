import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonplaceholderService, Todo } from './jsonplaceholder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos$: Observable<Todo[]> | Promise<Todo[]>;
  todos: Todo[] = [];

  text: string;

  constructor(private jsonplaceholderService: JsonplaceholderService) {}

  onClick(): void {
    this.todos$ = this.jsonplaceholderService.getTodos();
  }

  onChangeText(): void {
    console.warn(this.text);
    this.todos$ = this.jsonplaceholderService.getTodosByUserId(
      this.text.length.toString()
    );
    // this.todos$ = this.jsonplaceholderService.fetchTodosByUserId(
    //   this.text.length.toString()
    // );
    this.jsonplaceholderService.getTodosByUserId(this.text.length.toString());
  }
}
