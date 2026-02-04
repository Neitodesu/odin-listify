import { createTodoItem } from './todoItem.js';
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
  createTodoItem('Item 1', false, '02/23/2026', 'Med', false, 34692);
  resetModal();
});

modalCreateBtn.addEventListener('click', () => {
  if (newModalInput.value === '' || dueDate.value === '') {
    return;
  }
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
