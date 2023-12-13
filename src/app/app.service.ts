import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {
  }

  getTodoList(status?:any) {
    const url= status ? `${this.baseUrl}/todos?completed=${status}` :`${this.baseUrl}/todos`
    return this.http.get<Todo[]>(url);
  }

  getTodoListById(id: Todo['id']){
    return this.http.get<Todo[]>(`${this.baseUrl}/todos/${id}`)
  }

  addTodo(postData: Todo) {
    return this.http.post(`${this.baseUrl}/todos`, postData);
  }

  updateTodo(postData: Todo) {
    return this.http.patch(`${this.baseUrl}/todos/${postData.id}`, postData);
  }

  editTodo(postData: Todo) {
    return this.http.put(`${this.baseUrl}/todos/${postData.id}`, postData);
  }

  deleteTodo(id: Todo['id']) {
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }

}
