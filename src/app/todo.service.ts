import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';

@Injectable()
export class TodoService {

	todos: Todo[] = [];
	id: number = 0;

  constructor(private http: Http) {

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

  getTodos(): Promise<Todo[]>{
  	let url = "http://localhost:4201/todos";

		return this.http.get(url)
               .toPromise()
               .then(response => response.json() as Todo[])
               .catch(this.handleError);

  	}

  addTodo(todo: Todo):void{
  	if(!todo.id){
  		todo.id = ++ this.id;
  	}

  	this.todos.push(todo);
  }

  toggleCompleted(hero: Todo): void {
  	// return false;
    //this.getTodos().find(h => hero === h).completed = !hero.completed;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
