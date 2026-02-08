import projectImg from '../assets/sidebar-list-img.png';
import { format, parseISO, isAfter } from 'date-fns';
import { defaultTodoDisplay, renderTodoItems } from './todoItem.js';
import { resetModal } from './todoModal.js';
import { closeMobileMenu } from './mobileMenu.js';

const projectHeader = document.querySelector('.project-header');
const listContainer = document.querySelector('.lists-container');
const listTemplate = document.querySelector('#sideListTemplate');
const todoContainer = document.querySelector('.todo-container');
const completeItemsBtn = document.querySelector('#completeItemsBtn');
const urgentItemsBtn = document.querySelector('#urgentItemsBtn');
const pendingItemsBtn = document.querySelector('#pendingItemsBtn');
const upcomingItemsBtn = document.querySelector('#upcomingItemsBtn');

let currentProject;
let currentTodo;
const savedProjects = JSON.parse(localStorage.getItem('Projects'));
const systemProjects = [
  'Upcoming Items',
  'Pending Items',
  'Complete Items',
  'Urgent Items',
];

let projectList = savedProjects ?? [
  {
    title: 'Upcoming Items',
    id: 0,
    todo: [],
  },
  {
    title: 'Pending Items',
    id: 1,
    todo: [],
  },
  {
    title: 'Complete Items',
    id: 2,
    todo: [],
  },
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

const updateLocalStorage = (list) => {
  localStorage.setItem('Projects', JSON.stringify(list));
};

const generateCryptoId = () => {
  return (
    crypto.randomUUID?.() ??
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  );
};

const createProject = (title) => {
  const todoArray = new Array();
  const projectId = generateCryptoId();
  const newProject = new Project(title, projectId, todoArray);
  projectList.push(newProject);
  updateLocalStorage(projectList);
  return newProject;
};

const renderProject = (title) => {
  projectHeader.textContent = title;
};

const renderTodos = (list) => {
  list.find((project) => {
    if (project.id == currentProject) {
      todoContainer.textContent = '';

      if (project.todo.length === 0) {
        defaultTodoDisplay(project.id);
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
  updateLocalStorage(projectList);
  renderTodos(projectList);
};

const removeTodoItem = (todo) => {
  const project = projectList.find((project) => project.id === currentProject);
  if (!project) return;

  project.todo = project.todo.filter((item) => item.id !== todo.id);
  renderTodos(projectList);
};

const updateCurrentTodoId = (id) => {
  currentTodo = id;
};

const updateTodoItem = (inputtext, date, priority) => {
  const project = projectList.find((project) => project.id === currentProject);
  if (!project) return;
  const todoIndex = project.todo.findIndex((todo) => todo.id === currentTodo);

  project.todo[todoIndex].text = inputtext;
  const setDate = parseISO(date);
  project.todo[todoIndex].date = format(setDate, 'MM/dd/yyyy');
  project.todo[todoIndex].priority = priority;
  if (priority === 'High') {
    project.todo[todoIndex].isImportant = true;
  } else {
    project.todo[todoIndex].isImportant = false;
  }
  updateLocalStorage(projectList);
  renderTodos(projectList);
  resetModal();
};

const updateCurrentProject = (id) => {
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
    closeMobileMenu();
  });

  card.querySelector('#sideListRemove').addEventListener('click', () => {
    listContainer.removeChild(card);
    removeProject(id);
    updateLocalStorage(projectList);
  });
};

const removeProject = (id) => {
  projectList = projectList.filter((project) => project.id !== id);
  if (currentProject === id) {
    const nextProjectId = projectList.length ? projectList[0].id : null;
    updateCurrentProject(nextProjectId);
  }
};

const getSourceProjects = (list) => {
  return list.filter((project) => !systemProjects.includes(project.title));
};

const sortUpcomingTodos = (list) => {
  const today = new Date();
  const upcomingTodoObj = list.find(
    (project) => project.title === 'Upcoming Items',
  );
  upcomingTodoObj.todo = [];

  getSourceProjects(list).forEach((project) => {
    project.todo.forEach((todo) => {
      if (isAfter(todo.date, today) && !todo.checked) {
        upcomingTodoObj.todo.push(todo);
      }
    });
  });
  updateCurrentProject(upcomingTodoObj.id);
};

const sortPendingTodos = (list) => {
  const pendingTodoObj = list.find(
    (project) => project.title === 'Pending Items',
  );
  pendingTodoObj.todo = [];

  getSourceProjects(list).forEach((project) => {
    project.todo.forEach((todo) => {
      if (!todo.checked) {
        pendingTodoObj.todo.push(todo);
      }
    });
  });
  updateCurrentProject(pendingTodoObj.id);
};

const sortCompleteTodos = (list) => {
  const completeTodoObj = list.find(
    (project) => project.title === 'Complete Items',
  );
  completeTodoObj.todo = [];

  getSourceProjects(list).forEach((project) => {
    project.todo.forEach((todo) => {
      if (todo.checked) {
        completeTodoObj.todo.push(todo);
      }
    });
  });
  updateCurrentProject(completeTodoObj.id);
};

const sortUrgentTodos = (list) => {
  const urgentTodoObj = list.find(
    (project) => project.title === 'Urgent Items',
  );
  currentProject = urgentTodoObj.id;
  urgentTodoObj.todo = [];

  getSourceProjects(list).forEach((project) => {
    project.todo.forEach((todo) => {
      if (todo.isImportant) {
        urgentTodoObj.todo.push(todo);
      }
    });
  });
  updateCurrentProject(urgentTodoObj.id);
};

document.addEventListener('DOMContentLoaded', () => {
  const hasUserProject = projectList.some(
    (project) => !systemProjects.includes(project.title),
  );

  if (!hasUserProject) {
    createProject('My Project');
  }

  projectList.forEach((project) => {
    if (!systemProjects.includes(project.title)) {
      updateSideBar(project.title, project.id);
    }
  });

  const firstUserProject = projectList.find(
    (project) => !systemProjects.includes(project.title),
  );

  updateCurrentProject(firstUserProject?.id ?? 0);
});

upcomingItemsBtn.addEventListener('click', () => {
  sortUpcomingTodos(projectList);
  closeMobileMenu();
});

pendingItemsBtn.addEventListener('click', () => {
  sortPendingTodos(projectList);
  closeMobileMenu();
});

completeItemsBtn.addEventListener('click', () => {
  sortCompleteTodos(projectList);
  closeMobileMenu();
});

urgentItemsBtn.addEventListener('click', () => {
  sortUrgentTodos(projectList);
  closeMobileMenu();
});

export {
  createProject,
  projectList,
  updateTodos,
  renderProject,
  renderTodos,
  removeTodoItem,
  projectHeader,
  updateTodoItem,
  updateCurrentTodoId,
  updateCurrentProject,
  generateCryptoId,
  updateSideBar,
  updateLocalStorage,
};
