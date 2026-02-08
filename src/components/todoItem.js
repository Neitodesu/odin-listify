import checked from '../assets/item-complete.png';
import unChecked from '../assets/item-pending.png';
import lowPriorImg from '../assets/low-prior.png';
import medPriorImg from '../assets/med-prior.png';

import {
  updateTodos,
  removeTodoItem,
  updateCurrentTodoId,
  projectHeader,
  projectList,
  updateCurrentProject,
  updateLocalStorage,
} from './newProject.js';
import { openEditModal } from './dom.js';

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
  newTodo.isNew = true;
  updateTodos(newTodo);
};

const renderTodoItems = (todo) => {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector('.todo-item');

  card.dataset.todoId = todo.id;

  if (todo.isNew) {
    card.classList.add('slideIn');

    card.addEventListener(
      'animationend',
      () => {
        todo.isNew = false;
      },
      { once: true },
    );
  }

  card.querySelector('#newTodoImg').src = todo.checked ? checked : unChecked;
  card.querySelector('#todoInputText').textContent = todo.text;
  card.querySelector('#todoInputText').style.textDecoration = todo.checked
    ? 'line-through'
    : 'none';
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

    card.querySelector('#todoInputText').style.textDecoration = todo.checked
      ? 'line-through'
      : 'none';

    card.querySelector('#newTodoImg').src = todo.checked ? checked : unChecked;
    updateLocalStorage(projectList);
  });

  card.querySelector('#newTodoRemoveBtn').addEventListener('click', () => {
    if (projectHeader.textContent === 'Upcoming Items') return;
    if (projectHeader.textContent === 'Pending Items') return;
    if (projectHeader.textContent === 'Complete Items') return;
    if (projectHeader.textContent === 'Urgent Items') return;
    removeTodoItem(todo);
  });

  card.querySelector('#newTodoEditBtn').addEventListener('click', () => {
    updateCurrentTodoId(card.dataset.todoId);
    openEditModal(todo);
  });

  container.appendChild(card);
};

const defaultTodoDisplay = (id) => {
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.classList.add('default-display');
  switch (id) {
    case 0:
      p.textContent = 'No upcoming items';
      break;
    case 1:
      p.textContent = 'No pending items';
      break;
    case 2:
      p.textContent = 'No complete items';
      break;
    case 3:
      p.textContent = 'No urgent items';
      break;
    default:
      p.textContent = 'Got an idea?';
  }
  div.appendChild(p);
  const defaultBox = document.querySelector('.todo-container');
  defaultBox.appendChild(div);
};

export { createTodoItem, renderTodoItems, defaultTodoDisplay };
