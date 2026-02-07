import editIcon from '../assets/pen-edit.png';
import { createProject } from './newProject.js';
const newProjectBtn = document.querySelector('#newProjectBtn');
const openProjectModal = () => {
  const backdrop = document.createElement('div');
  const container = document.createElement('div');
  const title = document.createElement('h3');
  const topRow = document.createElement('div');
  const img = document.createElement('img');
  const input = document.createElement('input');
  const bottomRow = document.createElement('div');
  const createButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  title.textContent = 'New List';
  img.src = editIcon;
  input.type = 'text';
  createButton.textContent = 'Create';
  cancelButton.textContent = 'Cancel';
  topRow.classList.add('project-modal-top-row');
  topRow.appendChild(img);
  topRow.appendChild(input);
  bottomRow.classList.add('project-modal-bottom-row');
  bottomRow.appendChild(createButton);
  bottomRow.appendChild(cancelButton);
  backdrop.classList.add('project-modal');
  container.classList.add('project-modal-container');

  container.appendChild(title);
  container.appendChild(topRow);
  container.appendChild(bottomRow);
  backdrop.appendChild(container);
  document.body.appendChild(backdrop);
  input.focus();

  container.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  backdrop.addEventListener('click', () => {
    document.body.removeChild(backdrop);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (input.value === '') {
        return;
      }
      createProject(input.value);
      document.body.removeChild(backdrop);
    }
  });
  createButton.addEventListener('click', () => {
    if (input.value === '') {
      return;
    }
    createProject(input.value);
    document.body.removeChild(backdrop);
  });

  cancelButton.addEventListener('click', () => {
    document.body.removeChild(backdrop);
  });
};
export { newProjectBtn, openProjectModal };
