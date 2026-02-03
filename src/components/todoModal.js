import { parseISO, format } from 'date-fns';
import { updateCurrentList, renderTodos } from './todoItem.js';

const newTodoBtn = document.querySelector('#addItemBtn');
const todoModal = document.querySelector('#newTodoModal');
const todoModalBackdrop = document.querySelector('.todo-modal-backdrop');
const todoModalDetails = document.querySelector('.todo-modal-container');
const dueDate = document.querySelector('#datePicker');
const priorityPicker = document.querySelector('#priorityPicker');
const newModalInput = document.querySelector('#newTodoInput');

const modalCreateBtn = document.querySelector('#modalCreateBtn');
const modalCloseBtn = document.querySelector('#modalCloseBtn');

const resetModal = () => {
  newModalInput.value = '';
  dueDate.value = '';
  priorityPicker.value = 'Low';

  todoModal.close();
};

const openModal = () => {
  todoModal.showModal();
  todoModalDetails.addEventListener('click', (e) => e.stopPropagation());
};

todoModalBackdrop.addEventListener('click', () => {
  resetModal();
});

modalCloseBtn.addEventListener('click', () => {
  resetModal();
});

modalCreateBtn.addEventListener('click', () => {
  if (newModalInput.value === '' || dueDate.value === '') {
    return;
  }
  createTodoData();
  renderTodos(newModalInput.value, dueDate.value, priorityPicker.value);
  resetModal();
});

const createTodoData = () => {
  const text = newModalInput.value;
  const checked = false;
  const setDate = parseISO(dueDate.value);
  const date = format(setDate, 'MM/dd/yyyy');
  const priority = priorityPicker.value;
  let isImportant = () => {
    if (priorityPicker.value !== 'High') {
      return false;
    }
    return true;
  };
  updateCurrentList(text, checked, date, priority, isImportant());
};

export {
  openModal,
  newTodoBtn,
  todoModal,
  todoModalBackdrop,
  todoModalDetails,
  modalCreateBtn,
  modalCloseBtn,
};
