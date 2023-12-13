import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo';
import { AppService } from './app.service';
import { CheckboxChangeEvent } from 'primeng/checkbox';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: any;
  id: any;
  selectedLabel: any;
  completed: any;
  labelOptions: any[] = [
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Health', value: 'Health' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Work', value: 'Work' },
  ];

  @ViewChild('todoTask') todoTask: any;
  @ViewChild('selected') selected: any;

  task = '';
  todos: Todo[] = [];


  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.appService.getTodoList(this.completed).subscribe(
      response => {
        this.todos = response;
      }
    )
  }



  getById(id: any) {
    this.appService.getTodoListById(id).subscribe(
      (response: any) => {
        console.log(response);
        this.task = response.task;
        this.selectedLabel = response.label
        this.id = response.id
      }
    )
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo) {
    this.appService.updateTodo({ ...todo, completed: e.checked }).subscribe(
      response => console.log(response)
    )
  }

  editTodo() {
    if (this.id) {
      const newTodo: Todo = { id: this.id, task: this.task, completed: false, label: this.selectedLabel };
      this.appService.editTodo({ ...newTodo }).subscribe(
        response => {
          this.todoTask.reset();
          this.selected.reset();
          this.getList();
        }
      )
    } else {
      const newTodo: Todo = { task: this.task, completed: false, label: this.selectedLabel };
      this.appService.addTodo(newTodo).subscribe(
        response => {
          this.todoTask.reset();
          this.selected.reset();
          this.getList();
        }
      )
    }
  }

  deleteTodo(e: unknown, id: Todo['id']) {
    this.appService.deleteTodo(id).subscribe(
      response => this.getList()
    )
  }
}
