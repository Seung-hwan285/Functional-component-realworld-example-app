import LoginForm from '../LoginForm';
import { screen } from '@testing-library/dom';
import { auth_request } from '../../../lib/auth/request';

describe('LoginForm', () => {
  const EMAIL = 'Email';
  const PASSWORD = 'Password';

  test('initializes with empty email and password', () => {
    const col = document.createElement('div');
    col.className = 'offset-md-3';
    document.body.appendChild(col);

    LoginForm();

    expect(screen.getByPlaceholderText(EMAIL).value).toBe('');
    expect(screen.getByPlaceholderText(PASSWORD).value).toBe('');
  });

  test('updates state when input values change', () => {
    const loginForm = new LoginForm();

    const events = [
      {
        target: {
          name: 'email',
          value: 'test@test.com',
        },
      },
      {
        target: {
          name: 'password',
          value: '123',
        },
      },
    ];

    const expectedStates = [
      {
        email: 'test@test.com',
        password: '',
      },
      {
        email: 'test@test.com',
        password: '123',
      },
    ];

    events.forEach((event, idx) => {
      loginForm.handleChange(event);
      expect(loginForm.state).toEqual(expectedStates[idx]);
    });
  });

  test('returns login token after authentication', async () => {
    const mockResponse = {
      user: {
        token: 'abc123',
      },
    };

    const loginData = {
      email: 'test@test.com',
      password: '123',
    };

    fetch.mockResponse(JSON.stringify(mockResponse));

    const expectedToken = mockResponse.user.token;
    const actualToken = await auth_request.userLogin(loginData);

    expect(actualToken).toEqual(expectedToken);
  });
});
