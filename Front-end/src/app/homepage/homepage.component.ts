import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../core/dtos/user";
import {ToDo} from "../../core/dtos/todo";
import {Taskservice} from "../../core/services/taskservice";
import {ToDoservice} from "../../core/services/todoservice";
import {ResponseDto} from "../../core/dtos/response";
import {Task} from "../../core/dtos/task";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  user = new User();
  activatedTask = 0;
  activatedToDo: boolean[] = [];
  tasks: Task[] = [];
  taskName = '';
  todoName = '';

  constructor(private router: Router, private taskservice: Taskservice, private todoservice: ToDoservice) {
    this.user.id = localStorage.getItem('user_id') as string;
    this.user.username = localStorage.getItem('name') as string;
    this.user.password = localStorage.getItem('password') as string;

    this.taskservice.getAllTasks(this.user).subscribe(
      res => {
        // Handle the response
        this.getAllTasksComplete(res);
        console.log(res);
      },
      error => {
        // Handle error
        console.error('Error:', error);
      }
    );

  }

  getAllTasksComplete(res: ResponseDto<Task[]>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    this.tasks = res.result;
    if(this.activatedToDo.length < this.tasks[this.activatedTask].toDoList.length)
      this.activatedToDo.push(false);

    else {
      let activatedToDo2: boolean[] = [];
      for (let i = 0; i < this.activatedToDo.length; i++) {
        if (this.activatedToDo[i] != true)
          activatedToDo2.push(false);
      }
      this.activatedToDo = activatedToDo2;
    }
    //tasks[activatedTask].toDoList
  }

  handleActivated(index: number) {
    this.activatedTask = index;
    this.activatedToDo = [];
    for(let i = 0; i < this.tasks[this.activatedTask].toDoList.length; i++){

      this.activatedToDo.push(false);
    }
  }

  toLogin() {
    this.router.navigate([''])
  }

  addTask() {
    if (this.taskName == '') {
      alert('Ten task khong duoc trong!')
      return
    }
    let task = new Task();
    task.user_id = this.user.id;
    task.serial = this.tasks.length + 1;
    task.name = this.taskName;

    this.taskservice.addTask(task).subscribe(
      res => {
        // Handle the response
//                 this.addTaskComplete(res);
        console.log(res);
        this.taskservice.getAllTasks(this.user).subscribe(
          res => {

            // Handle the response
            this.getAllTasksComplete(res);
            this.activatedTask = this.tasks.length-1 ;
            console.log(res);
          },
          error => {
            // Handle error
            console.error('Error:', error);
          }
        );
      },
      error => {
        // Handle error
        console.error('Error:', error);
      }
    );

  }

  deleteTask() {

    let task = new Task();
    task = this.tasks[this.activatedTask];
    if(this.activatedTask !== 0 ) this.activatedTask--;

    this.taskservice.deleteTask(task).subscribe(
      res => {
        // Handle the response
        //                 this.addTaskComplete(res);
        console.log(res);
        this.taskservice.getAllTasks(this.user).subscribe(
          res => {
            // Handle the response
            this.getAllTasksComplete(res);
            console.log(res);
          },
          error => {
            // Handle error
            console.error('Error:', error);
          }
        );
      },
      error => {
        // Handle error
        console.error('Error:', error);
      }
    );

  }

  addToDo() {
    if (this.todoName == '') {
      alert('Ten todo khong duoc trong!')
      return
    }
    let todo = new ToDo();
    todo.task_id = this.tasks[this.activatedTask].id;
    todo.serial = this.tasks[this.activatedTask].toDoList.length + 1;
    todo.todo_name = this.todoName;
    this.todoservice.addToDo(todo).subscribe(
      res => {
        // Handle the response
        //                 this.addTaskComplete(res);
        console.log(res);
        this.taskservice.getAllTasks(this.user).subscribe(
          res => {
            // Handle the response
            this.getAllTasksComplete(res);
            console.log(res);
          },
          error => {
            // Handle error
            console.error('Error:', error);
          }
        );
      },
      error => {
        // Handle error
        console.error('Error:', error);
      }
    );

  }

  in(i: number) {
  //   for (let item of activatedToDo;
  //   let i = index
  // )
  //   {
  //     if (item == i) {
  //       return true;
  //     }
  //   }
  //   return false;

  }

  addCheckList(i: number) {
    this.tasks[this.activatedTask].toDoList[i].checked = !this.tasks[this.activatedTask].toDoList[i].checked
    this.todoservice.updateToDo(this.tasks[this.activatedTask].toDoList[i]).subscribe(
      res => {
        // Handle the response
        //                 this.addTaskComplete(res);
        console.log(res);

      },
      error => {
        // Handle error
        console.error('Error:', error);
      }
    );
  }

  deleleToDo(){
    console.log(this.tasks[this.activatedTask].toDoList.length)
    let listTodo: ToDo[]=[];
    for(let i = 0; i < this.tasks[this.activatedTask].toDoList.length; i++) {
      if(this.activatedToDo[i] == true) {
        let todo = new ToDo();
        todo.id = this.tasks[this.activatedTask].toDoList[i].id;
        listTodo.push(todo);
      }
    }
    this.todoservice.deleteToDo(listTodo).subscribe(
      res => {
        // Handle the response
        //                 this.addTaskComplete(res);
        console.log(res);
        this.taskservice.getAllTasks(this.user).subscribe(
          res => {
            // Handle the response
            this.getAllTasksComplete(res);
            console.log(res);
          },
          error => {
            // Handle error
            console.error('Error:', error);
          }
        );
      },
      error => {
        // Handle error
        console.error('Error:', error);
      }
    );
  }

  selectToDo(i:number){
    this.activatedToDo[i] = !this.activatedToDo[i];
  }
}
