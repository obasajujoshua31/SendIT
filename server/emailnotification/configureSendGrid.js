import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessages = msg => {
  sgMail
    .send(msg)
    .then(() => {})
    .catch(() => {});
};

export default sendMessages;
