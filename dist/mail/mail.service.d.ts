import { MailerService } from '@nestjs-modules/mailer';
import { SendMail } from './dto/index.dto';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMail(payload: SendMail): Promise<void>;
}
