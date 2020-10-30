import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

class MailProvider implements IMailProvider {
  private cliente: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporte = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.cliente = transporte;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = {
      from: 'Sender Name <sender@example.com>',
      to,
      subject: 'Recuperação d esenha',
      text: body,
    };

    const info = await this.cliente.sendMail(message);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default MailProvider;
