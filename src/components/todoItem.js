import { parseISO, format } from 'date-fns';
import checked from '../assets/item-complete.png';
import unChecked from '../assets/item-pending.png';
import lowPriorImg from '../assets/low-prior.png';
import medPriorImg from '../assets/med-prior.png';
import highPriorImg from '../assets/todo-alert.png';

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

const projectList = [
  {
    project: 'My Project',
    id: '1',
    todo: [],
  },
];

const updateCurrentList = (text, checked, date, priority, isImportant) => {
  const todoId = crypto.randomUUID();
  const todo = new TodoItem(text, checked, date, priority, isImportant, todoId);
  projectList[0].todo.push(todo);
};

const renderTodos = (text, date, priority) => {
  let hasChecked = false;
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector('.todo-item');
  const setDate = parseISO(date);
  date = format(setDate, 'MM/dd/yyyy');

  card.querySelector('#todoInputText').textContent = text;
  card.querySelector('#todoInputDate').textContent = date;
  card.querySelector('#todoInputPriority').textContent = priority;
  card.querySelector('#newTodoImg').src = unChecked;
  if (priority === 'Low') {
    card.querySelector('#newTodoPriorImg').src = lowPriorImg;
  }
  if (priority === 'Med') {
    card.querySelector('#newTodoPriorImg').src = medPriorImg;
  }
  if (priority === 'High') {
    card.querySelector('#newTodoPriorImg').src = highPriorImg;
  }

  card.querySelector('#newTodoImg').addEventListener('click', () => {
    hasChecked = !hasChecked;
    card.querySelector('#newTodoImg').src = hasChecked ? checked : unChecked;
  });

  container.appendChild(card);
};

export { projectList, updateCurrentList, renderTodos };
