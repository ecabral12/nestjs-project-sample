import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { PizzaController } from './pizza/pizza.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PizzaModule } from './pizza/pizza.module';
import { LoggingMiddleware } from './middleWare/logger.middleware';

@Module({
  imports: [UserModule,PizzaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes(PizzaController);
  }
}
