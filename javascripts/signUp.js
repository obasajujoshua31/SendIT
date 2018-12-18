const signUpFormElement = document.getElementById('signup_form');
const signInFormElement = document.getElementById('signin_form1');
const signInButton = document.getElementById('signInButton');
const signUpButton = document.getElementById('signUpButton');
const forgotSignUplink = document.getElementById('forgot_password');
const forgotPasswordForm = document.getElementById('forgot_password_form');
const showSignInFormButton = document.getElementById('show_signin_form_button');
const newPasswordCreationForm = document.getElementById(
  'new_password_creation_form'
);
const forgotPasswordSubmitButton = document.getElementById(
  'forgot_password_submit_button'
);
const newPasswordCreationButton = document.getElementById(
  'new_password_creation_button'
);

document.getElementById('createSignUpForm').addEventListener('click', event => {
  event.preventDefault();
  signInFormElement.style.display = 'none';
  signUpFormElement.style.display = 'block';
});

document.getElementById('removeSignUpForm').addEventListener('click', event => {
  event.preventDefault();
  signInFormElement.style.display = 'block';
  signUpFormElement.style.display = 'none';
});

forgotSignUplink.addEventListener('click', event => {
  event.preventDefault();
  forgotPasswordForm.style.display = 'block';
  signInFormElement.style.display = 'none';
});
showSignInFormButton.addEventListener('click', event => {
  event.preventDefault();
  signInFormElement.style.display = 'block';
  forgotPasswordForm.style.display = 'none';
});

signInButton.addEventListener('click', event => {
  event.preventDefault();

  const email = document.getElementById('user_email').value;
  const password = document.getElementById('user_password').value;

  fetch('https://obasajujoshua31.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res.success === false) {
        document.getElementById('server_response_login').innerHTML =
          'Invalid Email or Password';
      } else {
        window.localStorage.setItem('sendItToken', `Bearer ${res.token}`);
        window.localStorage.setItem('sendItUserId', res.userObject[0].user_id);
        window.localStorage.setItem(
          'sendItUserName',
          `${res.userObject[0].last_name}, ${res.userObject[0].first_name}`
        );
        if (res.userObject[0].is_admin === false) {
          window.location = './dashboard.html';
        } else {
          window.location = './admin_dashboard.html';
        }
      }
    })
    .catch(e => console.log(e));
});

signUpButton.addEventListener('click', event => {
  event.preventDefault();
  const firstName = document.getElementById('user_signup_first_name').value;
  const lastName = document.getElementById('user_signup_last_name').value;
  const email = document.getElementById('user_signup_email').value;
  const password = document.getElementById('user_signup_password').value;

  fetch('https://obasajujoshua31.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res.success === false) {
        if (Array.isArray(res.error)) {
          let errors = '<ul>';
          res.error.forEach(error => {
            errors += `<li style ="line-height: 20px; text-align: left;">${
              error.msg
            }</li>`;
          });
          document.getElementById('server_response_signup').innerHTML = errors;
        } else {
          document.getElementById('server_response_signup').innerHTML =
            res.error;
        }
      } else {
        window.localStorage.setItem('sendItToken', `Bearer ${res.token}`);
        window.localStorage.setItem('sendItUserId', res.userObject[0].user_id);
        window.localStorage.setItem(
          'sendItUserName',
          `${res.userObject[0].last_name}, ${res.userObject[0].first_name}`
        );
        window.location = './dashboard.html';
      }
    })
    .catch(e => console.log(e));
});
forgotPasswordSubmitButton.addEventListener('click', event => {
  event.preventDefault();
  const firstName = document.getElementById('forgot_password_first_name').value;
  const email = document.getElementById('forgot_password_email').value;

  fetch('https://obasajujoshua31.herokuapp.com/api/v1/account/recovery', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      email,
    }),
  })
    .then(res => res.json())
    .then(res => {
      if (res.success === false) {
        if (Array.isArray(res.error)) {
          let errors = '<ul>';
          res.error.forEach(error => {
            errors += `<li style ="line-height: 20px; text-align: left;">${
              error.msg
            }</li>`;
          });
          document.getElementById(
            'server_response_forgot_password'
          ).innerHTML = errors;
        } else {
          document.getElementById('server_response_forgot_password').innerHTML =
            res.error;
        }
      } else {
        const newEmailElement = `
          
          <input type ="hidden" id ="new_password_creation_email" value = ${email}>
        `;
        newPasswordCreationForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
        document.getElementById(
          'server_response_create_new_password_success'
        ).innerHTML = 'Accout Verified Successfully';
        document.getElementById(
          'server_response_create_new_password_success_element'
        ).innerHTML = newEmailElement;
      }
    })
    .catch(error => console.log(error));
});

newPasswordCreationButton.addEventListener('click', event => {
  event.preventDefault();
  const password = document.getElementById('user_new_password').value;
  const passwordConfirmation = document.getElementById(
    'user_new_confirmation_password'
  ).value;
  const email = document.getElementById('new_password_creation_email').value;

  fetch('https://obasajujoshua31.herokuapp.com/api/v1/account/recovery', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      passwordConfirmation,
    }),
  })
    .then(res => res.json())
    .then(res => {
      if (res.success === false) {
        document.getElementById(
          'server_response_create_new_password'
        ).innerHTML = res.error;
      } else {
        newPasswordCreationForm.style.display = 'none';
        signInFormElement.style.display = 'block';
        document.getElementById('server_response_login_success').innerHTML =
          'Password Changed Successfully';
      }
    })
    .catch(err => console.log(err));
});
const userSignInStatus = window.localStorage.getItem('userSignInStatus');
const isAdminLoggedIn = window.localStorage.getItem('isAdminLoggedIn');

const loadHomePage = () => {
  if (userSignInStatus === 'false' || !userSignInStatus) {
    document.getElementById('server_response_login').innerHTML =
      'You are not Logged in';
  } else if (userSignInStatus === 'true') {
    window.location = './dashboard.html';
  } else if (isAdminLoggedIn === 'true' || !isAdminLoggedIn) {
    window.location = './admin_dashboard.html';
  } else if (isAdminLoggedIn === 'false') {
    document.getElementById('server_response_login').innerHTML =
      'You are not Logged in';
  }
};

window.addEventListener('load', loadHomePage);
