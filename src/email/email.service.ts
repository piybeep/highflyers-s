import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/User.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendRecoveryMessage(user: User) {
    const link = `highflyers.ru/recovery/newpassword?id=${user.id}&code=${user.resetCode}`;
    const username =
      user.first_name || user.second_name
        ? `${user.first_name ?? ''} ${user.second_name ?? ''}`
        : 'Пользователь';
    await this.mailerService.sendMail({
      to: user.email,
      template: './recovery',
      subject: `Запрос на восстановления пароля`,
      context: {
        user: username,
        link,
      },
    });
  }
}
