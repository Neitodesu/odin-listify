import './styles.css';
import { newTodoBtn, openModal } from './components/todoModal.js';
import { newProjectBtn, openProjectModal } from './components/projectModal.js';
import {
  createProject,
  projectList,
  projectHeader,
} from './components/newProject.js';
import { mobileMenuBtn, openMobileMenu } from './components/mobileMenu.js';

createProject('My Project');

newProjectBtn.addEventListener('click', () => {
  openProjectModal();
});
newTodoBtn.addEventListener('click', () => {
  if (projectList.length === 0) return;
  if (projectHeader.textContent === 'Upcoming Items') return;
  if (projectHeader.textContent === 'Pending Items') return;
  if (projectHeader.textContent === 'Complete Items') return;
  if (projectHeader.textContent === 'Urgent Items') return;
  openModal();
});
mobileMenuBtn.addEventListener('click', () => {
  openMobileMenu();
});
