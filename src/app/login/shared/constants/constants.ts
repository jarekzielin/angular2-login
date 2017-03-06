export let EMAIL_REGEX = /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/;
export let PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d$@$!%*#?&]{6,}/;

export let API_URL = 'http://localhost:8080';
export let LOGIN_ENDPOINT = '/api/login';

export let MOCKED_AUTHORIZED_EMAIL = 'test@example.com';
export let MOCKED_AUTHORIZED_PASSORD = 'Password1';
