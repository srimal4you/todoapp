import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoService {

	todos: Todo[] = [];
	id: number = 0;

  constructor() {

  	let temptodos: Todo[] = [
	  	{
	  		"id":1,
	  		"name": "test",
	  		"description" : "description",
	  		'completed' : false
	  	},
	  	{
	  		"id":2,
	  		"name": "test ddfdsfd",
	  		"description" : "description dfdfds",
	  		'completed' : true
	  	}
  	];

  	temptodos.forEach(item => {
  		this.todos.push(item);
  	});

  }

  getTodos():Todo[]{
  	return this.todos;
  }

  addTodo(todo: Todo):void{
  	if(!todo.id){
  		todo.id = ++ this.id;
  	}

  	this.todos.push(todo);
  }

}
