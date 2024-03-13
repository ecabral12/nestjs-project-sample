import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  
  @Get("user/:id")
  getClientById(@Param('id') id: string) {
    const clientId = parseInt(id, 10);
    const client = this.userService.getClientById(clientId)
    if (client != null) {
      return client;
    } else {
      return null; 
    }
  }

  @Post("user/add")
  addClient(@Body() newClient: { name: string }) {
    return this.userService.addClient(newClient);
  }

}
