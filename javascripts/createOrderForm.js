const newForm = document.getElementById('create_form');
const createForm = () => {
  newForm.style.display = 'block';
};
document
  .getElementById('create_new_form')
  .addEventListener('click', createForm);
const closeForm = () => {
  newForm.style.display = 'none';
};
const submitParcelOrder = event => {
  event.preventDefault();
  const parcelName = document.getElementById('new_parcel_name').value;
  const weight = document.getElementById('new_parcel_weight').value;
  const weightMetric = document.getElementById('new_parcel_weight_metric')
    .value;
  const from = document.getElementById('new_parcel_pick_up_location').value;
  const to = document.getElementById('new_parcel_destination').value;
  fetch('https://obasajujoshua31.herokuapp.com/api/v1/parcels', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      parcelName,
      weight,
      weightMetric,
      from,
      to,
    }),
  })
    .then(res => res.json())
    .then(res => {
      if (res.success === false) {
        let errors = '<ul>';
        res.error.forEach(error => {
          errors += `<li style ="line-height: 20px; text-align: left;">${
            error.msg
          }</li>`;
        });
        document.getElementById(
          'server_response_create_parcel'
        ).innerHTML = errors;
      } else {
        document.getElementById('parcel_status_success').innerHTML =
          'Parcel Order Created Successfully';
        window.location = './dashboard.html';
      }
    })
    .catch(error => console.log(error));
};
document.getElementById('closeButton').addEventListener('click', closeForm);
document
  .getElementById('create_form_button')
  .addEventListener('click', submitParcelOrder);
