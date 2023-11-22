import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const findUser = await this.prisma.client.findFirst({
      where: { email: createClientDto.email },
    });
    if (findUser) {
      throw new ConflictException('Email Already exists');
    }
    const client = new Client();
    Object.assign(client, {
      ...createClientDto,
    });

    const newClient = await this.prisma.client.create({
      data: {
        nomeCompleto: createClientDto.nomeCompleto,
        email: createClientDto.email,
        senha: createClientDto.senha,
        telefone: createClientDto.telefone,
      },
    });

    return plainToInstance(Client, newClient);
  }

  async findAll() {
    const users = await this.prisma.client.findMany();

    return plainToInstance(Client, users);
  }

  async findOne(id: string) {
    const user = await this.prisma.client.findFirst({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return plainToInstance(Client, user);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const userToUpdate = await this.prisma.client.findFirst({
      where: { id: id },
    });

    if (!userToUpdate) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    const updatedUser = this.prisma.client.update({
      where: { id: id },
      data: {
        nomeCompleto: updateClientDto.nomeCompleto,
        email: updateClientDto.email,
        senha: updateClientDto.senha,
        telefone: updateClientDto.telefone,
      },
    });

    return plainToInstance(Client, updatedUser);
  }

  async remove(id: string) {
    const userToDelete = await this.prisma.client.findFirst({
      where: { id: id },
    });

    if (!userToDelete) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    const deletedUser = await this.prisma.client.delete({
      where: { id: id },
    });

    return;
  }
}
