import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';

@Injectable()
export class TodoService {

	todos: Todo[] = [];
	id: number = 0;

  apiBase: string = 'http://localhost:4201';
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {

        this.headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });

  }

  getTodos(): Promise<Todo[]>{

  	let endpoint = `${this.apiBase}/todos`;

		return this.http.get(endpoint)
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

  toggleCompleted(todo: Todo): Promise<Todo> {

    todo.completed = !todo.completed;

    let url = `${this.apiBase}/todos/${todo.id}`;

    return this.http.put(url, JSON.stringify(todo),this.options)
           .toPromise()
           .then(response => response.json() as Todo)
           .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
