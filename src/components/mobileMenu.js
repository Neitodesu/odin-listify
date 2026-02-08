const mobileMenuBtn = document.querySelector('#mobileMenuBtn');
const sideBar = document.querySelector('#sideBar');
const workspace = document.querySelector('#workspace');
const div = document.createElement('div');
div.classList.add('mobile-menu-backdrop');

let isOpen = false;
function openMobileMenu() {
  workspace.appendChild(div);
  isOpen = !isOpen;
  console.log('Hello');
  if (!isOpen) {
    sideBar.classList.remove('menu-slide-in');
  }
  if (isOpen) {
    sideBar.classList.add('menu-slide-in');
  }
}

function closeMobileMenu() {
  isOpen = false;
  sideBar.classList.remove('menu-slide-in');
  if (workspace.contains(div)) {
    workspace.removeChild(div);
  }
}

div.addEventListener('click', () => {
  closeMobileMenu();
});

export { mobileMenuBtn, openMobileMenu, closeMobileMenu };
