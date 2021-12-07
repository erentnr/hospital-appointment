require('dotenv').config();
const nodemailer = require('nodemailer');

const {
  ENV_SMTP_HOST,
  ENV_SMTP_PORT,
  ENV_SMTP_SECURE,
  ENV_SENDER_MAIL_ADDRESS,
  ENV_SENDER_MAIL_PASSWORD
} = process.env;

exports.appointmentCreateNotifyMail = async (patientFirstName, patientLastName, appointmentDate, appointmentDepartment, departmentDoctor) => {
  try {
    let transporter = nodemailer.createTransport({
      host: ENV_SMTP_HOST,
      port: ENV_SMTP_PORT,
      secure: ENV_SMTP_SECURE,
      auth: {
        user: ENV_SENDER_MAIL_ADDRESS,
        pass: ENV_SENDER_MAIL_PASSWORD,
      },
    });

    let aDate = new Date(Date.now(appointmentDate));
    let date = aDate.getDate();
    let time = aDate.getTime();

    renderFile(__dirname + "/mailTemplates/appointmentCreateNotifyMail.html", {
        firstName: patientFirstName,
        lastName: patientLastName,
        date: date,
        time: time,
        department: appointmentDepartment,
        doctor: departmentDoctor
      })
      .then(html => {
        transporter.sendMail({
          from: `"Hospital X" <${ENV_SENDER_MAIL_ADDRESS}>`,
          to: email,
          subject: "Hospital X - Randevunuz Oluşturuldu",
          html: html
        });
      })
      .catch(error => {
        console.log(error);
      })
  } catch (error) {
    console.log(error);
  }
}