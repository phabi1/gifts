import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHashService {
    async hash(password: string): Promise<string> {
        return password;
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return password === hash;
    }
}
