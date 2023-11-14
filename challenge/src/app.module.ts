import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { ClientsModule } from './clients/clients.module';
import { ClientsModule } from './module/clients/clients.module';
import { ContactsModule } from './module/contacts/contacts.module';

@Module({
  imports: [ContactsModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
