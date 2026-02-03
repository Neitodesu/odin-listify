import { parseISO, format } from 'date-fns';

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
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector('.todo-item');
  const setDate = parseISO(date);
  date = format(setDate, 'MM/dd/yyyy');

  card.querySelector('#todoInputText').textContent = text;
  card.querySelector('#todoInputDate').textContent = date;
  card.querySelector('#todoInputPriority').textContent = priority;

  container.appendChild(card);
  console.log(projectList);
};

export { projectList, updateCurrentList, renderTodos };
