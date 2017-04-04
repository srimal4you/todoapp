import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Todo } from '../../classes/todo';

@Injectable()
export class TodoService {

	todos: Todo[] = [];
	id: number = 0;

  apiBase: string = 'http://localhost:4201/api';
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    this.headers = new Headers({ 'Content-Type': 'application/json',
                                 'x-access-token': user.token 
                    });
    this.options = new RequestOptions({ headers: this.headers });

  }

  getTodos(): Promise<Todo[]>{

  	let endpoint = `${this.apiBase}/todo`;

		return this.http.get(endpoint, {headers: this.headers})
               .toPromise()
               .then(response => response.json() as Todo[])
               .catch(this.handleError);

  }

  addTodo(todo: Todo):Promise<any>{

    let url = `${this.apiBase}/todo/`;
    return this.http.post(url,JSON.stringify(todo),this.options)
      .toPromise()
      .then(response => { return response.json()})
      .catch(this.handleError);

  }

  toggleCompleted(todo: Todo): Promise<Todo> {

    todo.completed = !todo.completed;

    let url = `${this.apiBase}/todo/${todo._id}`;

    return this.http.put(url, JSON.stringify(todo),this.options)
           .toPromise()
           .then(response => response.json() as Todo)
           .catch(this.handleError);
  }

  deleteTodo(todo : Todo): Promise<any> {
    
    let url = `${this.apiBase}/todo/${todo._id}`;
    return this.http.delete(url, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
