const token = window.localStorage.getItem('sendItToken');
let parcelId;
const cancelParcelOrder = event => {
  event.preventDefault();
  const userResponse = confirm('are you sure you want to Cancel this Order?');
  if (userResponse === false) {
    window.location = './dashboard.html';
  } else {
    fetch(
      `https://obasajujoshua31.herokuapp.com/api/v1/parcels/${parcelId}/cancel`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          Authorization: token,
        },
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.success === false) {
          document.getElementById('parcel_status').innerHTML =
            'There was an Error cancelling your order';
          window.location = './dashboard.html';
        } else {
          document.getElementById('parcel_status_success').innerHTML =
            'Parcel Cancelled Successfully';
          window.location = './dashboard.html';
        }
      })
      .catch(err => console.log(err));
  }
};

document
  .getElementById('cancelParcel')
  .addEventListener('click', cancelParcelOrder);
const updateForm = document.getElementById('update_form');
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
          document.getElementById('status_placed').checked = 'true';
          break;
        case 'TRANSITING':
          document.getElementById('status_transiting').checked = 'true';
          break;
        case 'DELIVERED':
          document.getElementById('status_delivered').checked = 'true';
          break;
        default:
          document.getElementById('status_cancelled').checked = 'true';
          document.getElementById('your_new_destination').disabled = 'true';
          document.getElementById('submitUpdateButton').hidden = 'true';
          document.getElementById('cancelParcel').hidden = 'true';
          break;
      }
    })
    .catch(err => console.log(err));
};
const closeUpdateForm = () => {
  updateForm.style.display = 'none';
};
document
  .getElementById('closeButton2')
  .addEventListener('click', closeUpdateForm);
const submitUpdate = event => {
  event.preventDefault();
  const destination = document.getElementById('your_new_destination').value;
  fetch(
    `https://obasajujoshua31.herokuapp.com/api/v1/parcels/${parcelId}/destination`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        destination,
      }),
    }
  )
    .then(res => res.json())
    .then(res => {
      if (res.success === false) {
        document.getElementById('server_response_update_form_error').innerHTML =
          res.error;
      } else {
        document.getElementById('parcel_status_success').innerHTML =
          'Parcel Destination Updated Successfully';
      }
      window.location = './dashboard.html';
    })
    .catch(err => console.log(err));
};
document
  .getElementById('submitUpdateButton')
  .addEventListener('click', submitUpdate);

const addRowToDashboardTable = parcelData => {
  const tableRef = document.getElementById('myDashboardTable');
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

const loadDashboard = () => {
  const userId = window.localStorage.getItem('sendItUserId');
  const userName = window.localStorage.getItem('sendItUserName');

  fetch(
    `https://obasajujoshua31.herokuapp.com/api/v1/users/${userId}/parcels`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    }
  )
    .then(res => res.json())
    .then(res => {
      document.getElementById(
        'user_greeting'
      ).innerHTML = `Welcome ${userName}`;
      if (res.success === false) {
        document.getElementById('parcel_status').innerHTML =
          'You have no Parcels';
      } else {
        // console.log(Object.values(res.data[0]));
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

window.addEventListener('load', loadDashboard);
