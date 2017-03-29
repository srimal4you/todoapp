import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

import { TodoService} from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [ TodoService ]
})
export class TodoComponent implements OnInit {

	todos: Todo[];
	newTodo: Todo = new Todo();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  	this.todos = this.todoService.getTodos();
  }

  addTodo():void {
  	if(!this.newTodo.name){ return; }

  	this.todoService.addTodo(this.newTodo);
  	this.newTodo = new Todo();
  }

  toggleCompleted(todo: Todo) {
    this.todoService.toggleCompleted(todo);
  }

}
