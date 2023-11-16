import { Module } from '@nestjs/common';

import { ClientsModule } from './module/clients/clients.module';
import { ContactsModule } from './module/contacts/contacts.module';

@Module({
  imports: [ContactsModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
