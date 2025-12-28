import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { type Response } from "express";

@Catch()
export class AllExceptionsFilters implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilters.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse() as Response;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : "Internal server error";

    this.logger.error(message, exception);

    response.status(httpStatus).json({
      status: httpStatus,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    })
  }
}