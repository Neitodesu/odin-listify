import { parseISO, format } from 'date-fns';
import { projectList } from './newProject.js';
import checked from '../assets/item-complete.png';
import unChecked from '../assets/item-pending.png';
import lowPriorImg from '../assets/low-prior.png';
import medPriorImg from '../assets/med-prior.png';
import highPriorImg from '../assets/todo-alert.png';

import { updateTodos } from './newProject.js';

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

export { createTodoItem };
