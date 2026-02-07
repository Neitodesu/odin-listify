import projectImg from '../assets/sidebar-list-img.png';
import { defaultTodoDisplay, renderTodoItems } from './todoItem.js';

const projectHeader = document.querySelector('.project-header');
const listContainer = document.querySelector('.lists-container');
const listTemplate = document.querySelector('#sideListTemplate');
const todoContainer = document.querySelector('.todo-container');
const completeItemsBtn = document.querySelector('#completeItemsBtn');
const urgentItemsBtn = document.querySelector('#urgentItemsBtn');
const pendingItemsBtn = document.querySelector('#pendingItemsBtn');
const upcomingItemsBtn = document.querySelector('#upcomingItemsBtn');

let projectList = [];
let currentProject;

let upcomingItemsList = [
  {
    title: 'Upcoming Items',
    id: 0,
    todo: [],
  },
];

let pendingItemsList = [
  {
    title: 'Pending Items',
    id: 1,
    todo: [],
  },
];

let completeItemsList = [
  {
    title: 'Complete Items',
    id: 2,
    todo: [],
  },
];

let urgentItemsList = [
  {
    title: 'Urgent Items',
    id: 3,
    todo: [],
  },
];

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
};

const renderProject = (title) => {
  projectHeader.textContent = title;
};

const renderTodos = (list) => {
  list.find((project) => {
    if (project.id == currentProject) {
      todoContainer.textContent = '';

      if (project.todo.length === 0) {
        defaultTodoDisplay(currentProject);
      } else {
        project.todo.forEach((todo) => {
          renderTodoItems(todo);
        });
      }
    }
  });
};

const updateTodos = (obj) => {
  projectList.find((project) => {
    if (project.id == currentProject) {
      project.todo.push(obj);
    }
  });
  renderTodos(projectList);
};

const removeTodoItem = (todo) => {
  const project = projectList.find((project) => project.id === currentProject);
  if (!project) return;

  project.todo = project.todo.filter((item) => item.id !== todo.id);
  renderTodos(projectList);
};

const updateCurrentProject = (id) => {
  if (!id) {
    currentProject = null;
    renderProject('No projects found');
    todoContainer.textContent = '';
    defaultTodoDisplay();
    return;
  }

  const project = projectList.find((project) => project.id === id);

  if (!project) return;

  currentProject = id;
  renderProject(project.title);
  renderTodos(projectList);
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
  if (currentProject === id) {
    const nextProjectId = projectList.length ? projectList[0].id : null;
    updateCurrentProject(nextProjectId);
  }
};

upcomingItemsBtn.addEventListener('click', () => {
  currentProject = upcomingItemsList[0].id;
  upcomingItemsList[0].todo = [];
  projectList.forEach((project) => {
    project.todo.forEach((todo) => {
      if (!todo.checked) {
        upcomingItemsList[0].todo.push(todo);
      }
    });
  });
  renderProject(upcomingItemsList[0].title);
  renderTodos(upcomingItemsList);
});

pendingItemsBtn.addEventListener('click', () => {
  currentProject = pendingItemsList[0].id;
  pendingItemsList[0].todo = [];
  projectList.forEach((project) => {
    project.todo.forEach((todo) => {
      if (!todo.checked) {
        pendingItemsList[0].todo.push(todo);
      }
    });
  });
  renderProject(pendingItemsList[0].title);
  renderTodos(pendingItemsList);
});

completeItemsBtn.addEventListener('click', () => {
  currentProject = completeItemsList[0].id;
  completeItemsList[0].todo = [];
  projectList.forEach((project) => {
    project.todo.forEach((todo) => {
      if (todo.checked) {
        completeItemsList[0].todo.push(todo);
      }
    });
  });

  renderProject(completeItemsList[0].title);
  renderTodos(completeItemsList);
});

urgentItemsBtn.addEventListener('click', () => {
  currentProject = urgentItemsList[0].id;
  urgentItemsList[0].todo = [];
  projectList.forEach((project) => {
    project.todo.forEach((todo) => {
      if (todo.isImportant) {
        urgentItemsList[0].todo.push(todo);
      }
    });
  });
  renderProject(urgentItemsList[0].title);
  renderTodos(urgentItemsList);
});

export {
  createProject,
  projectList,
  updateTodos,
  removeTodoItem,
  projectHeader,
};
