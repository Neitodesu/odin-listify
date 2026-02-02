const newTodoBtn = document.querySelector('#addItemBtn');
const todoModal = document.querySelector('#newTodoModal');
const todoModalBackdrop = document.querySelector('.todo-modal-backdrop');
const todoModalDetails = document.querySelector('.todo-modal-container');

const modalCreateBtn = document.querySelector('#modalCreateBtn');
const modalCloseBtn = document.querySelector('#modalCloseBtn');

const resetModal = () => {
  return;
};

const openModal = () => {
  todoModal.showModal();
  todoModalDetails.addEventListener('click', (e) => e.stopPropagation());
};

todoModalBackdrop.addEventListener('click', () => {
  todoModal.close();
});

modalCloseBtn.addEventListener('click', () => {
  todoModal.close();
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
