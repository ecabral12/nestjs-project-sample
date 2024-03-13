import { Module,DynamicModule } from '@nestjs/common';
import { AppController } from './user.controller';
import { UserService } from './user.service';

@Module({
  exports: [UserService],  
  controllers: [AppController],
  providers: [UserService],
})
export class UserModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: UserModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        UserModule,
      ],
      exports: [UserService],
    };
  }
}
