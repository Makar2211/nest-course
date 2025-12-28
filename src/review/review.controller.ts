import { Body, Controller, Post } from '@nestjs/common';
import { UpdateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post('create')
  async createReview(@Body() dto: UpdateReviewDto) {
    return this.reviewService.createReview(dto);
  }
}
