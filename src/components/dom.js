import { format } from 'date-fns';

const todoModal = document.querySelector('#newTodoModal');
const todoModalDetails = document.querySelector('.todo-modal-container');
const dueDate = document.querySelector('#datePicker');
const priorityPicker = document.querySelector('#priorityPicker');
const newModalInput = document.querySelector('#newTodoInput');
const todoModalHeader = document.querySelector('#todoModalHeader');

const modalCreateBtn = document.querySelector('#modalCreateBtn');

const openEditModal = (todo) => {
  todoModalHeader.textContent = 'Edit Todo';
  newModalInput.value = todo.text;
  priorityPicker.value = todo.priority;
  dueDate.value = format(todo.date, 'yyyy-MM-dd');
  modalCreateBtn.textContent = 'Update';
  todoModal.showModal();
};
todoModalDetails.addEventListener('click', (e) => e.stopPropagation());

export { openEditModal };
