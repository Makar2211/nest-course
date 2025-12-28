import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie, MoviePoster } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) { }

  async findAllMovies(): Promise<Movie[]> {
    return this.prisma.movie.findMany({
      where: {
        isAvailable: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        actors: {
          select: {
            id: true, name: true
          }
        },
      }
    });
  }


  async createMovie(dto: CreateMovieDto): Promise<Movie> {

    const actors = await this.prisma.actor.findMany({
      where: {
        id: {
          in: dto.actorsIds
        }
      }
    })

    if (!actors) {
      throw new NotFoundException('Some actors not found');
    }

    let poster: MoviePoster | null = null;


    const isExistMovie = await this.prisma.movie.findUnique({
      where: {
        title: dto.title
      }
    })
    if (isExistMovie) {
      throw new NotFoundException('Movie with this title already exists');
    }


    const movie = await this.prisma.movie.create({
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        posters: dto.imageUrl ? {
          create: {
            url: dto.imageUrl
          }
        } : undefined,
        actors: {
          connect: actors.map(actor => ({ id: actor.id }))
        }
      },
      include: {
        actors: {
          select: {
            id: true, name: true
          }
        },
        posters: true
      }
    });
    return movie;
  }


  async findMovieById(id: string): Promise<Movie | Error> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id: id
      },
      include: {
        actors: true,
        posters: true,
        reviews: true
      }
    })

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie
  }

  async updateMovie(id: string, dto: UpdateMovieDto): Promise<Movie | Error> {
    const movie = await this.findMovieById(id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    const actors = await this.prisma.actor.findMany({
      where: {
        id: {
          in: dto.actorsIds
        }
      }
    })


    if (!actors) {
      throw new NotFoundException('Some actors not found');
    }


    return await this.prisma.movie.update({
      where: {
        id: id
      },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        posters: dto.imageUrl ? {
          create: {
            url: dto.imageUrl
          }
        } : undefined,
        actors: {
          connect: actors.map(actor => ({ id: actor.id }))
        }
      }
    })

  }


  async deleteMovie(id: string): Promise<Boolean | Error> {
    const movie = await this.findMovieById(id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.prisma.movie.delete({
      where: {
        id: id
      }
    });

    return true;
  }
}
