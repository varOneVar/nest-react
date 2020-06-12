import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
// import { Transport, MicroserviceOptions } from '@nestjs/microservices'
// import { ValidationPipe } from './common/pipes/validate.pipe'
import { Reflector } from '@nestjs/core'
import { LoggingInterceptor } from './common/interceptors/request.interceptor'
import { AllExceptionsFilter } from './common/error-filters/all-exception.filter'
import { RolesGuard } from './common/guards/roles.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RolesGuard(new Reflector()))
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(5749);
}
bootstrap();
