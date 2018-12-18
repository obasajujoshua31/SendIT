const dropDown = document.getElementById('dropdown');

window.document.addEventListener('click', e => {
  if (e.target.id === 'profile_dropdown') {
    dropDown.style.display = 'block';
  } else {
    dropDown.style.display = 'none';
  }
});

const logOutUser = event => {
  event.preventDefault();
  window.localStorage.removeItem('sendItToken');
  window.location = './index.html';
};

const logOutUserList = document.getElementsByClassName('logout_user');
for (let logOutElement of logOutUserList) {
  logOutElement.addEventListener('click', logOutUser);
}
