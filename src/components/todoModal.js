import { createTodoItem } from './todoItem.js';
import { format, parseISO } from 'date-fns';

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
  const setDate = parseISO(dueDate.value);
  const newDate = format(setDate, 'MM/dd/yyyy');
  const todoId = crypto.randomUUID();
  const isImportant = () => {
    if (priorityPicker.value != 'High') {
      return false;
    } else {
      return true;
    }
  };
  createTodoItem(
    newModalInput.value,
    false,
    newDate,
    priorityPicker.value,
    isImportant(),
    todoId,
  );
  resetModal();
});

export {
  openModal,
  newTodoBtn,
  todoModal,
  todoModalBackdrop,
  todoModalDetails,
  modalCreateBtn,
  modalCloseBtn,
};
