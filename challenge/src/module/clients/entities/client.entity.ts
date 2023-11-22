import { Exclude } from 'class-transformer';
import { Contact } from 'src/module/contacts/entities/contact.entity';

export class Client {
  id: string;
  nomeCompleto: string;
  email: string;
  @Exclude()
  senha: string;
  telefone: string;
  dataDeRegistro: Date;
  contatos: Contact[];
}
