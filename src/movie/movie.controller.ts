import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieCreateResponseDto, MovieGetAllResponseDto, MovieUpdateResponseDto } from './entities/response-movie.dto';
import { MovieService } from './movie.service';
@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }


  @ApiOperation({ summary: 'Get all movies', description: 'Retrieve a list of all movies' })
  @ApiResponse({
    status: HttpStatus.OK, description: 'List of movies retrieved successfully.', type: [MovieGetAllResponseDto]
  })
  @ApiNotFoundResponse({
    description: 'No movies found.', example: {
      statusCode: 404,
      message: 'No movies found',
      timestamp: new Date().toISOString(),
      path: '/movie'
    }
  })
  @Get("")
  async findAllMovies() {
    return this.movieService.findAllMovies();
  }


  @ApiOperation({ summary: 'Create a movie', description: 'Create a new movie with the provided data' })
  @ApiOkResponse({ description: 'Movie created successfully.', type: MovieCreateResponseDto })
  @ApiNotFoundResponse({
    description: 'Invalid input data.', example: {
      statusCode: 404,
      message: ['Movie with this title already exists', 'Some actors not found'],
      timestamp: new Date().toISOString(),
      path: '/movie/create'
    }
  })
  @Post("create")
  async createMovie(@Body() dto: CreateMovieDto) {
    return this.movieService.createMovie(dto);
  }


  @ApiParam({ name: 'id', type: String, description: 'The ID of the movie to retrieve' })
  @ApiQuery({ name: 'year', required: false, type: Boolean, description: 'Filter movies by year' })
  @ApiHeader({ name: 'X-Authorization', description: 'Bearer token for authentication' })
  @ApiOperation({ summary: 'Get movie by ID', description: 'Retrieve a movie by its ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Movie retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Movie not found.' })
  @Get(":id")
  async findMovieById(@Param('id') id: string) {
    return this.movieService.findMovieById(id);
  }


  @ApiParam({ name: 'id', type: String, description: 'The ID of the movie to update' })
  @ApiOperation({ summary: 'Update a movie', description: 'Update an existing movie with the provided data' })
  @ApiOkResponse({ description: 'Movie updated successfully.', type: MovieUpdateResponseDto })
  @ApiNotFoundResponse({
    description: 'Movie not found.', example: {
      statusCode: 404,
      message: 'Movie not found',
      timestamp: new Date().toISOString(),
      path: '/movie/:id'
    }
  })
  @Put(":id")
  async updateMovie(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.movieService.updateMovie(id, dto);
  }

  @Delete(":id")
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }

}
