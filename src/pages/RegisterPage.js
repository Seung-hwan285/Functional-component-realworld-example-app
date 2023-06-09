import {
  appendChildrenToParent,
  cleanHTML,
  createElement,
  RegisterForm,
  RegisterFormTitle,
} from './index.js';

function renderRegister(target) {
  const registerContainer = createElement('div', 'auth-page');
  const registerWrapper = createElement('div', 'container page');
  const registerRow = createElement('div', 'row');
  const registerCol = createElement('div', 'col-md-6 offset-md-3 col-xs-12');
  const container = document.querySelector('.auth-page');

  if (container) {
    return;
  }

  appendChildrenToParent(registerRow, registerCol);
  appendChildrenToParent(registerWrapper, registerCol);
  appendChildrenToParent(registerContainer, registerWrapper);
  appendChildrenToParent(target, registerContainer);
}

function RegisterPage(target) {
  cleanHTML.RegisterPage();
  renderRegister(target);

  const render = () => {
    RegisterFormTitle();
    RegisterForm();
  };
  render();
}
export default RegisterPage;
