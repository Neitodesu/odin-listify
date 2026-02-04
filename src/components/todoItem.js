import checked from '../assets/item-complete.png';
import unChecked from '../assets/item-pending.png';
import lowPriorImg from '../assets/low-prior.png';
import medPriorImg from '../assets/med-prior.png';

import { updateTodos, removeTodoItem } from './newProject.js';

const template = document.querySelector('#todoItemTemplate');
const container = document.querySelector('.todo-container');

class TodoItem {
  constructor(text, checked, date, priority, isImportant, id) {
    this.text = text;
    this.checked = checked;
    this.date = date;
    this.priority = priority;
    this.isImportant = isImportant;
    this.id = id;
  }
}

const createTodoItem = (text, checked, date, priority, isImportant, id) => {
  const newTodo = new TodoItem(text, checked, date, priority, isImportant, id);
  updateTodos(newTodo);
};

const renderTodoItems = (todo) => {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector('.todo-item');

  card.querySelector('#newTodoImg').src = todo.checked ? checked : unChecked;
  card.querySelector('#todoInputText').textContent = todo.text;
  card.querySelector('#todoInputDate').textContent = todo.date;
  if (todo.priority === 'Low') {
    card.querySelector('#newTodoPriorImg').src = lowPriorImg;
  }
  if (todo.priority === 'Med') {
    card.querySelector('#newTodoPriorImg').src = medPriorImg;
  }
  card.querySelector('#todoInputPriority').textContent = todo.priority;

  card.querySelector('#newTodoImg').addEventListener('click', () => {
    todo.checked = !todo.checked;

    card.querySelector('#newTodoImg').src = todo.checked ? checked : unChecked;
  });

  card.querySelector('#newTodoRemoveBtn').addEventListener('click', () => {
    removeTodoItem(todo);
  });

  container.appendChild(card);
};

export { createTodoItem, renderTodoItems };
