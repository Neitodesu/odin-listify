import { createTodoItem } from './todoItem.js';
import { format, parseISO } from 'date-fns';
import { updateTodoItem } from './newProject.js';
import {
  generateCryptoId,
  updateLocalStorage,
  projectList,
} from './newProject.js';

const newTodoBtn = document.querySelector('#addItemBtn');
const todoModal = document.querySelector('#newTodoModal');
const todoModalBackdrop = document.querySelector('.todo-modal-backdrop');
const todoModalDetails = document.querySelector('.todo-modal-container');
const dueDate = document.querySelector('#datePicker');
const priorityPicker = document.querySelector('#priorityPicker');
const newModalInput = document.querySelector('#newTodoInput');
const todoModalHeader = document.querySelector('#todoModalHeader');

const modalCreateBtn = document.querySelector('#modalCreateBtn');
const modalCloseBtn = document.querySelector('#modalCloseBtn');

const resetModal = () => {
  todoModalHeader.textContent = 'New Item';
  newModalInput.value = '';
  dueDate.value = '';
  priorityPicker.value = 'Low';
  modalCreateBtn.textContent = 'Create';

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
  if (modalCreateBtn.textContent === 'Update') {
    updateTodoItem(newModalInput.value, dueDate.value, priorityPicker.value);
    return;
  }
  if (newModalInput.value === '' || dueDate.value === '') {
    return;
  }
  const setDate = parseISO(dueDate.value);
  const newDate = format(setDate, 'MM/dd/yyyy');
  const todoId = generateCryptoId();
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
  updateLocalStorage(projectList);
  resetModal();
});

export { openModal, newTodoBtn, resetModal };
