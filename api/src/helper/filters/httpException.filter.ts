import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const stack = exception.stack;
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param type
     * @param message
     * @param _status
     * @param errorMessages?
     */
    const responseMessage = (
      type: string,
      message: string,
      _status = status,
      errorMessages?: string | string[],
    ) => {
      response.status(_status).json({
        statusCode: _status,
        path: request.url,
        method: request.method,
        type,
        message,
        errorMessages,
        timestamp: new Date().getTime(),
        ...(['development', 'test'].includes(process.env.NODE_ENV) ? { stack } : {}),
      });
    };

    if (status === 503) {
      response.status(status).json(exception.getResponse());
    } else {
      responseMessage(exception.name, exception.message, exception.status);
    }
  }
}
