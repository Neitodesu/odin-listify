import projectImg from '../assets/sidebar-list-img.png';
import { renderTodoItems } from './todoItem.js';
const projectHeader = document.querySelector('.project-header');
let projectList = [];
let currentProject;

const listContainer = document.querySelector('.lists-container');
const listTemplate = document.querySelector('#sideListTemplate');
const todoContainer = document.querySelector('.todo-container');

class Project {
  constructor(title, id, todo) {
    this.title = title;
    this.id = id;
    this.todo = todo;
  }
}

const createProject = (title) => {
  const todoArray = new Array();
  const projectId = crypto.randomUUID();
  const newProject = new Project(title, projectId, todoArray);
  currentProject = newProject.id;
  projectList.push(newProject);
  updateCurrentProject(newProject.id);
  updateSideBar(title, newProject.id);
  console.log(projectList);
};

const renderProject = (title) => {
  projectHeader.textContent = title;
};

const renderTodos = () => {
  projectList.find((project) => {
    if (project.id == currentProject) {
      todoContainer.textContent = '';

      project.todo.forEach((todo) => {
        renderTodoItems(todo);
      });
    }
  });
};

const updateTodos = (obj) => {
  projectList.find((project) => {
    if (project.id == currentProject) {
      project.todo.push(obj);
    }
  });
  renderTodos();
  console.log(projectList);
};

const removeTodoItem = (todo) => {
  console.log(todo.id);

  projectList.find((project) => {
    project.todo = project.todo.filter((item) => item.id !== todo.id);
  });
  renderTodos();
  console.log(projectList);
};

const updateCurrentProject = (id) => {
  projectList.find((project) => {
    if (project.id == id) {
      currentProject = project.id;
      renderProject(project.title);
      renderTodos();
      console.log(currentProject);
    }
  });
};

const updateSideBar = (name, id) => {
  const clone = listTemplate.content.cloneNode(true);
  const card = clone.querySelector('.sidebar-project-card');

  card.querySelector('#sidebarListImg').src = projectImg;
  card.querySelector('#sideListName').textContent = name;
  card.querySelector('#sideListRemove').textContent = 'X';

  listContainer.appendChild(card);

  card.querySelector('#sideListName').addEventListener('click', () => {
    updateCurrentProject(id);
  });

  card.querySelector('#sideListRemove').addEventListener('click', () => {
    listContainer.removeChild(card);
    removeProject(id);
  });
};

const removeProject = (id) => {
  projectList = projectList.filter((project) => project.id !== id);
};

export {
  createProject,
  projectList,
  updateTodos,
  updateSideBar,
  currentProject,
  renderTodos,
  removeTodoItem,
};
