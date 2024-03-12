import { Body, Controller, Get, Param, Post, NotFoundException, Put} from '@nestjs/common';
import { PizzaService } from './pizza.service';

@Controller()
export class PizzaController {
  private pizzas;

  constructor(private readonly pizzaService: PizzaService) {
  }

  @Get("pizza/:id")
  getPizzaById(@Param('id') id: string) {
    const pizzaId = parseInt(id, 10);
    const pizza = this.pizzaService.getPizzaById(pizzaId);

    if (pizza != null) {
      return pizza;
    } else {
      throw new NotFoundException(`Pizza with id ${id} not found.`);
    }
  }

  @Post("pizza/add")
  addPizza(@Body() newPizza: { name: string, ingredients: { id: number, name: string, quantity: string }[] }) {
    return this.pizzaService.addPizza(newPizza);
  }
  
  @Put("pizza/:id")
  updatePizza(@Param('id') id: string, @Body() updatedPizza: { name: string, ingredients: { id: number, name: string, quantity: number }[] }) {
    const pizzaId = parseInt(id, 10);
    try {
      return this.pizzaService.updatePizza(pizzaId, updatedPizza);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error; // Renvoie l'erreur originale pour une gestion ultérieure
      }
    }
  }

  
}
