import { Injectable } from '@nestjs/common';
import { Review } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) { }

  async createReview(dto: UpdateReviewDto): Promise<Review> {
    const review = await this.prisma.review.create({
      data: {
        text: dto.text,
        raiting: dto.raiting,
        movie: {
          connect: { id: dto.movieId }
        }
      }
    });

    return review;
  }

}
