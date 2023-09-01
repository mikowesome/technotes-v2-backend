import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GlobalPrefixMiddleware } from 'middlewares/global-prefix.middleware';

@Module({
  imports: [PrismaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GlobalPrefixMiddleware)
      .forRoutes('*'); // Apply the middle for all routes
  }
}