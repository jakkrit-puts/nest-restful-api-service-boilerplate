import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'กรุณากรอก Username' })
  username: string;

  @IsNotEmpty({ message: 'กรุณากรอก Password' })
  password: string;
}
