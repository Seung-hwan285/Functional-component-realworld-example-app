import { getLocalStroage } from '../../utils/storage.js';
import { fetchAuthUserInfo } from '../../utils/helper/fetchAuth.js';
import { auth_request } from '../../lib/auth/request.js';
import { route } from '../../utils/routes.js';
import Input from '../../commons/Input.js';

function SettingForm(target) {
  const SettingFormBox = document.createElement('form');
  SettingFormBox.className = 'form';

  const authToken = getLocalStroage('token');

  const paitSetting = () => {
    return `
       <hr />
      <button class="btn btn-outline-danger logout">
        Or click here to logout.
      </button>
      `;
  };
  const paintSettingDiv = document.createElement('div');
  paintSettingDiv.innerHTML = paitSetting();

  target.appendChild(SettingFormBox);
  target.appendChild(paintSettingDiv);

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('.email').value;
    const bio = document.querySelector('.form-control-lg').value;
    const image = document.querySelector('.image');
    const imageValue = image.value.trim() === '' ? null : image.value;

    const data = await auth_request.userUpdate(
      authToken,
      email,
      bio,
      imageValue
    );

    if (data) {
      route('/');
    }
  };

  const handleLogoutClick = async () => {
    const result = await auth_request.userLogout('token');
    if (result) {
      route('/');
    }
  };

  const renderForm = (user) => {
    SettingFormBox.innerHTML = /* HTML */ `
      <fieldset>
        <fieldset class="form-group">
          ${Input({
            className: 'form-control',
            type: 'text',
            placeholder: 'URL of profile picture',
            value: user.image,
          })}
        </fieldset>
        <fieldset class="form-group">
          ${Input({
            className: 'form-control form-control-lg',
            type: 'text',
            placeholder: 'Your Name',
            value: user.username,
          })}
        </fieldset>
        <fieldset class="form-group">
          <textarea
            class="form-control form-control-lg"
            rows="8"
            placeholder="Short bio about you"
          ></textarea>
        </fieldset>
        <fieldset class="form-group">
          ${Input({
            className: 'form-control form-control-lg email',
            type: 'text',
            placeholder: 'Email',
            value: user.email,
          })}
        </fieldset>
        <fieldset class="form-group">
          ${Input({
            className: 'form-control form-control-lg',
            type: 'password',
            placeholder: 'Password',
          })}
        </fieldset>
        <button class="btn btn-lg btn-primary pull-xs-right">
          Update Settings
        </button>
      </fieldset>
    `;

    const form = document.querySelector('.form');
    form.addEventListener('submit', handleUpdateUserSubmit);

    const button = document.querySelector('.logout');
    button.addEventListener('click', handleLogoutClick);
  };

  // 1. 먼저 비동기 데이터를 가져오기 전에 빈값으로 DOM을 렌더링시킨다.
  renderForm({ username: '', email: '' });

  // 2. 비동기 처리 후 안에 데이터를 채워준다.
  fetchAuthUserInfo(authToken).then((user) => {
    renderForm(user);
  });
}
export default SettingForm;
