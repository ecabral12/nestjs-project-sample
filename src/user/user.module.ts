import { Module,DynamicModule } from '@nestjs/common';
import { AppController } from './user.controller';
import { UserService } from './user.service';

@Module({
  exports: [UserService],  
  controllers: [AppController],
  providers: [UserService],
})
export class UserModule {
  static register(options: string): DynamicModule {
    return {
      module: UserModule,
      providers: [
        {
          provide: UserService,
          useValue: new UserService(),
        },
        UserModule,
      ],
      exports: [UserService],
    };
  }
}
