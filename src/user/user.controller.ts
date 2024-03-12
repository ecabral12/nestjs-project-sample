import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  private clients = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];

  @Get("user/:id")
  getClientById(@Param('id') id: string) {
    const clientId = parseInt(id, 10);
    const client = this.clients.find(client => client.id == clientId);

    if (client != null) {
      return client;
    } else {
      return null; 
    }
  }

  @Post("user/add")
  addClient(@Body() newClient: { name: string }) {
    const nextId = this.clients.length + 1;
    const client = { id: nextId, name: newClient.name };
    this.clients.push(client);
    return client;
  }

}
