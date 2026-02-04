const projectHeader = document.querySelector('.project-header');
const projectList = [];
let currentProject;

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
  renderProject(title);
};

const renderProject = (title) => {
  projectHeader.textContent = title;
};

const updateTodos = (obj) => {
  projectList.find((project) => {
    if (project.id == currentProject) {
      project.todo.push(obj);
    }
  });
  console.log(projectList);
};

export { createProject, projectList, updateTodos };
