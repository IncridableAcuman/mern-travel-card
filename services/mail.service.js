const { createTransport } = require("nodemailer");
class MailService {
  constructor() {
    this.transport = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      subject: false,
      auth: {
        user: "abdusharipovizzat03@gmail.com",
        pass: "xmjq nehl krta etob",
      },
    });
  }
  async sendMail(email, activationLink) {
    await this.transport.sendMail({
      from: "abdusharipovizzat03@gmail.com",
      to: email,
      html: `
            <div>
            <h1>Welcome to our website</h1>
            <a href="${activationLink}">Activation link to website of profile</a>
            </div>
            `,
    });
  }
  async sendForgotPassword(email, activationLink) {
    await this.transport.sendMail({
      from: "abdusharipovizzat03@gmail.com",
      to: email,
      subject: "Forgot password",
      html: `
            <div>
            <h1>Welcome to our website</h1>
            <a href="${activationLink}">Forgot password</a>
            </div>
            `,
    });
  }
}

module.exports = new MailService();
