import './styles.css';
import { newTodoBtn, openModal } from './components/todoModal.js';
import { newProjectBtn, openProjectModal } from './components/projectModal.js';
import { createProject, projectList } from './components/newProject.js';

createProject('My Project');

newProjectBtn.addEventListener('click', () => {
  openProjectModal();
});
newTodoBtn.addEventListener('click', () => {
  if (projectList.length === 0) {
    return;
  }
  openModal();
});
