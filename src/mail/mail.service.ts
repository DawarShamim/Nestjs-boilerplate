import { Injectable } from '@nestjs/common';
// import { CreateMailDto } from './dto/create-mail.dto';
// import { UpdateMailDto } from './dto/update-mail.dto';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  async sendEmail(
    userEmail: string,
    subject: string,
    template: string,
    data: Record<string, any>,
  ) {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: subject,
      template: template,
      context: data,
    });
  }
}
