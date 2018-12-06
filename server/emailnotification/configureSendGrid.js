import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessages = msg => {
  sgMail
    .send(msg)
    .then(response => {})
    .catch(error => {});
};

export default sendMessages;
