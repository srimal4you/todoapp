import { Component, OnInit } from '@angular/core';
import { Todo } from '../../classes/todo';
import { TodoService} from '../../services/todo/todo.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [ TodoService, AuthenticationService ]
})
export class TodoComponent implements OnInit {

	todos: Todo[];
	newTodo: Todo = new Todo();

  constructor(

    private todoService: TodoService,
    private authenticationService: AuthenticationService

  ) { }

  ngOnInit() {

    this.getTodos();
    
  }

  getTodos() : void {

    this.todoService.getTodos()
      .then(todos => this.todos = todos)

  }

  addTodo():void {
  	if(!this.newTodo.name){ return; }

  	this.todoService.addTodo(this.newTodo)
      .then(()=> this.getTodos());

  	this.newTodo = new Todo();
  }

  toggleCompleted(todo: Todo): any {

    if(!todo){ return false}
    this.todoService.toggleCompleted(todo)
      .then(()=> this.getTodos());
      
  }

  deleteTodo(todo: Todo): any {

    if(!todo){ return false}

    this.todoService.deleteTodo(todo)
      .then(()=> this.getTodos());
  }

}
