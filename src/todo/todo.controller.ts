import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req, UnauthorizedException
} from "@nestjs/common";
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { TodoModel } from './models/todo.model';
import { TodoEntity } from './entities/todo.entity';
import { GetTodoDto } from './dto/get-todo.dto';
import { Request } from 'express';
import { GetPaginatedTodosDto } from './dto/get-paginated-todos.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('rechercheOr')
  async RechercheTodosOr(@Query() criteres: GetTodoDto): Promise<TodoEntity[]> {
    return this.todoService.RechercheTodosOr(criteres);
  }
  @Get('rechercheAnd')
  async RechercheTodosAnd(
    @Query() criteres: GetTodoDto,
  ): Promise<TodoEntity[]> {
    return this.todoService.RechercheTodosAnd(criteres);
  }
  @Get('paginated')
  async paginatedTodos(
    @Query() gettodos: GetPaginatedTodosDto,
  ): Promise<TodoEntity[]> {
    return this.todoService.PaginatedTodos(gettodos);
  }
  @Get('all')
  async getTodos2(): Promise<TodoEntity[]> {
    return this.todoService.getTodos2();
  }

  @Get('all')
  getTodos(): TodoModel[] {
    return this.todoService.getTodos();
  }

  @Post('add')
  async addTodo2(@Req() req: Request, @Body() todo: AddTodoDto) {
    console.log(req['userId']);
    const userId = req['userId'];
    return this.todoService.addTodo2(todo, userId);
  }

  @Post('add')
  addTodo(@Body() todo: AddTodoDto): TodoModel {
    return this.todoService.addTodo(todo);
  }

  @Get('NumberByStatus')
  async NbTodoByStatus() {
    return this.todoService.NbTodoByStatus();
  }

  @Get(':id')
  async getTodoById2(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TodoEntity> {
    return this.todoService.getTodoById2(id);
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): TodoModel {
    return this.todoService.getTodoById(id);
  }

  @Delete('delete/:id')
  async deleteTodo2(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const todo = await this.todoService.getTodoById2(id);
    if (todo.createdBy != req['userId']) {
      throw new UnauthorizedException();
    }
    return this.todoService.deleteTodo2(id);
  }

  @Delete('softdelete/:id')
  async softdeleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.softDeleteTodo(id);
  }
  @Get('restore/:id')
  async restoreTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.restoreTodo(id);
  }

  @Delete('delete/:id')
  deleteTodo(@Param('id') id: string): string {
    return this.todoService.deleteTodo(id);
  }

  @Patch('update/:id')
  async updateTodo2(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() newtodo: UpdateTodoDto,
  ) {
    const todo = await this.todoService.getTodoById2(id);
    if (todo.createdBy != req['userId']) {
      throw new UnauthorizedException();
    }
    return this.todoService.updateTodo2(id, newtodo);
  }

  @Put('update/:id')
  updateTodo(
    @Param('id') id: string,
    @Body() newtodo: UpdateTodoDto,
  ): TodoModel {
    return this.todoService.updateTodo(id, newtodo);
  }
}
