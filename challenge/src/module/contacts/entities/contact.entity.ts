import { Client } from 'src/module/clients/entities/client.entity';

export class Contact {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  dataDeRegistro: Date;
  clientId: Client;
}
