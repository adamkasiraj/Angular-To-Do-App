import { CategoryDataService } from './categories/category-data.service';
import { Component, OnInit } from '@angular/core';
import {Todo} from './todos/todo';
import {TodoDataService} from './todos/todo-data.service';
import {Category} from './categories/category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [TodoDataService, CategoryDataService]

})

export class AppComponent implements OnInit {

  newTodo: Todo = new Todo();
  newCategory: Category = new Category();
  selectedCategory: Category;

  constructor(private todoDataService: TodoDataService, private categoryDataService: CategoryDataService) {
  }


  addTodo() {
    this.newTodo.category = this.selectedCategory.id;
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    console.log(this.todos);
  }

  toggleTodoComplete(todo: Todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo: Todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }

  get todosForCat() {
    return this.todoDataService.getTodoByCategory(this.selectedCategory.id);
  }

  countTodosByCat(id: number) {
    return this.todoDataService.getTodoByCategory(id).length;
  }

  addCategory() {
    this.categoryDataService.addCategory(this.newCategory);
    this.newCategory = new Category();
  }

  removeCategory(category: Category) {
    this.categoryDataService.deleteCategoryById(category.id);
  }

  get categories() {
    return this.categoryDataService.getAllCategories();
  }

  categoryById(id: number) {
    return this.categoryDataService.getCategoryById(id);
  }

  addInitialCategory(category: Category) {
    this.categoryDataService.addCategory(category);
  }

  addInitialTodo(todo: Todo) {
    this.todoDataService.addTodo(todo);
  }


  onSelect(category: Category): void {
    this.selectedCategory = category;
  }

  ngOnInit() {
    let initCat = new Category();
    initCat = {'name' : 'Today', 'id' : 1 , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Tomorrow', 'id' : 2 , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Shopping list', 'id' : 3 , };
    this.addInitialCategory(initCat);

    let initTodo = new Todo();
    initTodo = {'title' : 'Task1', 'complete': false, 'id' : 1 , category: 1 };
    this.addInitialTodo(initTodo);
    initTodo = {'title' : 'Task2', 'complete': true, 'id' : 2 , category: 2 };
    this.addInitialTodo(initTodo);
    initTodo = {'title' : 'Task3', 'complete': true, 'id' : 3 , category: 1 };
    this.addInitialTodo(initTodo);
  }

  showForm() {
    document.getElementById("addCategory").style.display = "none";
    document.getElementById("addCategoryForm").style.display = "block";
    document.getElementById("form1").focus();
  }


}