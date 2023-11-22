import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Client } from '../clients/entities/client.entity';
import { plainToInstance } from 'class-transformer';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) { }

  async create(createContactDto: CreateContactDto) {
    const findUser = await this.prisma.contacts.findFirst({
      where: { email: createContactDto.email },
    });
    if (findUser) {
      throw new ConflictException('Email Already exists');
    }

    const newContact = await this.prisma.contacts.create({
      data: {
        nomeCompleto: createContactDto.nomeCompleto,
        email: createContactDto.email,
        telefone: createContactDto.telefone,
        clientId: createContactDto.clientId,
      },
    });
    return plainToInstance(Contact, newContact);
  }

  async findAll() {
    const AllContacts = await this.prisma.contacts.findMany()
    return plainToInstance(Contact, AllContacts);
  }

  async findOne(id: string) {
    const contact = await this.prisma.contacts.findFirst({
      where: { id: id },
    });
    if (!contact) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return plainToInstance(Client, contact);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contactToUpdate = await this.prisma.contacts.findFirst({
      where: { id: id },
    });
    if (!contactToUpdate) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    const updatedContact = this.prisma.contacts.update({
      where: { id: id },
      data: { ...updateContactDto },
    });

    return plainToInstance(Contact, updatedContact);
  }

  async remove(id: string) {
    const client = await this.prisma.contacts.findFirst({
      where: { id: id },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    const clientToDelete = await this.prisma.contacts.delete({
      where: { id: id },
    });
    return;
  }
}
