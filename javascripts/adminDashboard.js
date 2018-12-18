const token = window.localStorage.getItem('sendItToken');
const userName = window.localStorage.getItem('sendItUserName');
let parcelId;

const updateForm = document.getElementById('admin_update_form');
const showUpdateForm = iconLink => {
  updateForm.style.display = 'block';
  parcelId = iconLink.getAttribute('value');
  fetch(`https://obasajujoshua31.herokuapp.com/api/v1/parcels/${parcelId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(res => res.json())
    .then(res => {
      document.getElementById('parcel_name').innerHTML =
        res.data[0].parcel_name;
      document.getElementById('parcel_weight').innerHTML = `${
        res.data[0].weight
      } ${res.data[0].weight_metric}`;
      document.getElementById('pick_up_location').innerHTML =
        res.data[0].pick_up_location;
      document.getElementById('destination').innerHTML =
        res.data[0].destination;
      document.getElementById('present_location').innerHTML =
        res.data[0].present_location;
      switch (res.data[0].status) {
        case 'PLACED':
          document.getElementById('status_placed').checked = true;
          document.getElementById('status_cancelled').checked = false;
          document.getElementById('status_delivered').checked = false;
          document.getElementById('status_transiting').checked = false;
          document.getElementById('status_delivered').checked = false;
          document.getElementById('your_new_location').disabled = false;
          document.getElementById('submitUpdateButton').hidden = false;

          break;
        case 'TRANSITING':
          document.getElementById('status_transiting').checked = true;
          document.getElementById('status_delivered').checked = false;
          document.getElementById('status_cancelled').checked = false;
          document.getElementById('status_placed').checked = false;
          document.getElementById('status_delivered').checked = false;
          document.getElementById('submitUpdateButton').hidden = false;
          document.getElementById('your_new_location').disabled = false;

          break;
        case 'DELIVERED':
          document.getElementById('status_delivered').checked = true;
          document.getElementById('status_cancelled').checked = false;
          document.getElementById('status_placed').checked = false;
          document.getElementById('status_transiting').checked = false;
          document.getElementById('status_delivered').checked = false;
          document.getElementById('submitUpdateButton').hidden = false;
          document.getElementById('your_new_location').disabled = true;
          document.getElementById('submitUpdateButton').hidden = true;

          break;
        case 'CANCELLED':
          document.getElementById('status_cancelled').checked = true;
          document.getElementById('status_placed').checked = false;
          document.getElementById('status_transiting').checked = false;
          document.getElementById('status_delivered').checked = false;
          document.getElementById('submitUpdateButton').hidden = true;
          document.getElementById('your_new_location').disabled = true;

          break;
        default:
          break;
      }
    })
    .catch(err => console.log(err));
};


const addRowToDashboardTable = parcelData => {
  const tableRef = document.getElementById('myAdminDashboardTable');
  const rowCount = tableRef.rows.length;
  const tr = tableRef.insertRow(rowCount);
  //   tr = tableRef.insertRow(rowCount);
  for (let c = 0; c < parcelData.length; c++) {
    let td = document.createElement('td');
    td = tr.insertCell(c);

    if (c === parcelData.length - 1) {
      const icon = document.createElement('i');
      icon.setAttribute('class', 'fa fa-bars view_parcel');
      icon.setAttribute('onclick', 'showUpdateForm(this)');
      icon.setAttribute('value', parcelData[0]);

      td.appendChild(icon);
    } else {
      const newText = document.createTextNode(parcelData[c + 1]);
      td.appendChild(newText);
    }
  }
};
const loadAdminDashboard = () => {
  fetch('https://obasajujoshua31.herokuapp.com/api/v1/parcels', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res.success === false) {
        if (res.error === 'You are not authorized') {
          window.location = './index.html';
        } else {
          document.getElementById(
            'user_greeting'
          ).innerHTML = `Welcome ${userName} As Admin`;

          document.getElementById('parcel_status').innerHTML =
            'There are no Available Parcels';
        }
      } else {
        // console.log(Object.values(res.data[0]));
        document.getElementById(
          'user_greeting'
        ).innerHTML = `Welcome ${userName} As Admin`;
        res.data.forEach(data => {
          const {
            parcel_id,
            pick_up_location,
            destination,
            weight,
            weight_metric,
            sent_on,
            status,
          } = data;

          addRowToDashboardTable([
            parcel_id,
            pick_up_location,
            destination,
            weight,
            weight_metric,
            sent_on,
            status,
          ]);
        });
      }
    })
    .catch(error => console.log(error));
};
document.getElementById('closeButton3').addEventListener('click', () => {
  updateForm.style.display = 'none';
});
window.addEventListener('load', loadAdminDashboard);
