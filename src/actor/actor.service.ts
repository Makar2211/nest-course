import { BadRequestException, Injectable } from '@nestjs/common';
import { Actor } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) { }

  async createActor(dto: CreateActorDto): Promise<Actor> {

    const isExistActor = await this.prisma.actor.findUnique({
      where: {
        name: dto.name
      }
    })

    if (isExistActor) {
      throw new BadRequestException('Actor with this name already exists');
    }

    const actor = await this.prisma.actor.create({
      data: {
        name: dto.name
      }
    });

    return actor

  }
}
