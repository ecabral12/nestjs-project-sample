import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private clients;

  constructor() {
    const data = fs.readFileSync('clients.json', 'utf8');
    this.clients = JSON.parse(data).pizzas;
  }

  getClientById(id: number): any {
    return this.clients.find(client => client.id === id);
  }

  addClient(newClient: { name: string }): any {
    const nextId = this.clients.length + 1;
    const client = { id: nextId, name: newClient.name };
    this.clients.push(client);

    fs.writeFileSync('clients.json', JSON.stringify({ clients: this.clients }));

    return client;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
