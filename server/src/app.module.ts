import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { LoggerMiddleware } from './common/middlrewares/logger.middleware'
import { ConfigModule } from '@nestjs/config'

import AllModules from './allModule'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', { autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true }),
    ConfigModule.forRoot(),
    ...AllModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user')
  }
}
