import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }


  @Get("")
  async findAllMovies() {
    return this.movieService.findAllMovies();
  }

  @Post("create")
  async createMovie(@Body() dto: CreateMovieDto) {
    return this.movieService.createMovie(dto);
  }

  @Get(":id")
  async findMovieById(@Param('id') id: string) {
    return this.movieService.findMovieById(id);
  }

  @Put(":id")
  async updateMovie(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.movieService.updateMovie(id, dto);
  }

  @Delete(":id")
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }

}
