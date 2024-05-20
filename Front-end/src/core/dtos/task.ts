import {ToDo} from "./todo";
export class Task {
  id!: string;
  name!: string;
  user_id!: string;
  toDoList : ToDo[] =[];
  serial!:number;
}
