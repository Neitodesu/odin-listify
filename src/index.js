import './styles.css';
import { newTodoBtn, openModal } from './components/modal.js';
import { newProjectBtn, openProjectModal } from './components/projectModal.js';

newProjectBtn.addEventListener('click', () => {
  openProjectModal();
});
newTodoBtn.addEventListener('click', () => {
  openModal();
});
