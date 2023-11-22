import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Client } from 'src/module/clients/entities/client.entity';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  clientId: string;
}
