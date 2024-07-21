import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { logger } from '../helpers/utility.logger';
import path from 'path';
import { promises as fs } from 'fs'; // Use promises API
import * as handlebars from 'handlebars';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendEmail(
    userEmail: string,
    subject: string,
    templateName: string,
    emailData: Record<string, any> = {},
  ) {
    const templatePath = path.resolve(
      __dirname,
      `../templates/${templateName}.html`,
    );
    // need to resolve
    const templateSource = await fs.readFile(templatePath, 'utf8');

    const template = handlebars.compile(templateSource);

    const html = template(emailData);
    try {
      const emailResponse = await this.transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender address
        to: userEmail,
        subject,
        html,
      });
      console.log(emailResponse);
    } catch (error) {
      logger.error(error);
    }
  }
}
