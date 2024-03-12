// pizza.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PizzaService {
  private pizzas;

  constructor() {
    const data = fs.readFileSync('pizzas.json', 'utf8');
    this.pizzas = JSON.parse(data).pizzas;
  }

  getPizzaById(id: number): any {
    return this.pizzas.find(pizza => pizza.id === id);
  }

  addPizza(newPizza: { name: string, ingredients: { id: number, name: string, quantity: string }[] }): any {
    const nextId = this.pizzas.length + 1;
    const pizza = { id: nextId, name: newPizza.name, ingredients: newPizza.ingredients };
    this.pizzas.push(pizza);

    fs.writeFileSync('pizzas.json', JSON.stringify({ pizzas: this.pizzas }));

    return pizza;
  }

  deletePizza(id: number): any {
    const index = this.pizzas.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Pizza with id ${id} not found.`);
    }
    const deletedPizza = this.pizzas.splice(index, 1)[0];

    return deletedPizza;
  }

  updatePizza(id: number, updatedPizza: { name: string, ingredients: { id: number, name: string, quantity: number }[] }): any {
    const index = this.pizzas.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Pizza with id ${id} not found.`);
    }
    const pizza = { id, ...updatedPizza };
    this.pizzas[index] = pizza;
    fs.writeFileSync('pizzas.json', JSON.stringify({ pizzas: this.pizzas }));

    return pizza;
  }


}


