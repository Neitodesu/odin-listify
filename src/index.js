import './styles.css';

const newTodoBtn = document.querySelector('#addItemBtn');
const todoModal = document.querySelector('#newTodoModal');
const todoModalBackdrop = document.querySelector('.todo-modal-backdrop');
const todoModalDetails = document.querySelector('.todo-modal-container');

todoModalDetails.addEventListener('click', (e) => {
  e.stopPropagation();
});

newTodoBtn.addEventListener('click', () => {
  todoModal.showModal();
});

todoModalBackdrop.addEventListener('click', () => {
  todoModal.close();
});
