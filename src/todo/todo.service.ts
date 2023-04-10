import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoModel, TodoStatusEnum } from './models/todo.model';
import { TodoEntity } from './entities/todo.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTodoDto } from './dto/get-todo.dto';
import { GetPaginatedTodosDto } from './dto/get-paginated-todos.dto';
import { async } from 'rxjs';

@Injectable()
export class TodoService {
  private todos: TodoModel[] = [];
  constructor(
    @Inject('UUID') private readonly uuidv4: () => string,
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  getTodos(): TodoModel[] {
    return this.todos;
  }
  async getTodos2(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }
  addTodo(todo: AddTodoDto): TodoModel {
    const { name, description } = todo;
    const newtodo = {
      id: this.uuidv4(),
      name,
      description,
      createdAt: new Date(),
      status: TodoStatusEnum.waiting,
    };
    this.todos.push(newtodo);
    return newtodo;
  }
  async addTodo2(todo: AddTodoDto, userId: string) {
    todo.createdBy = userId;
    return await this.todoRepository.save(todo);
  }
  getTodoById(id: string): TodoModel {
    const todo = this.todos.find((actualtodo) => actualtodo.id === id);
    if (todo) return todo;
    throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
  }
  async getTodoById2(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneById(id);
    if (!todo) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }
  deleteTodo(id: string): string {
    const index = this.todos.findIndex((actualtodo) => actualtodo.id === id);
    if (index > 0) {
      this.todos.splice(index, 1);
      return `le todo d'id ${id} a été supprimé avec succés`;
    }
    throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
  }
  async deleteTodo2(id: number) {
    const todo = await this.getTodoById2(id);
    return this.todoRepository.remove(todo);
  }
  async softDeleteTodo(id: number) {
    return await this.todoRepository.softDelete(id);
  }
  async restoreTodo(id: number) {
    return await this.todoRepository.restore(id);
  }

  updateTodo(id: string, newtodo: UpdateTodoDto): TodoModel {
    const todo = this.getTodoById(id);
    todo.description = newtodo.description
      ? newtodo.description
      : todo.description;
    todo.name = newtodo.name ? newtodo.name : todo.name;
    return todo;
  }
  async updateTodo2(id: number, newtodo: UpdateTodoDto) {
    return await this.todoRepository.update(id, newtodo);
  }
  async NbTodoByStatus() {
    const qb = this.todoRepository.createQueryBuilder('todo');
    qb.select('todo.status,count(todo.id) as NbTodo').groupBy('todo.status');
    return await qb.getRawMany();
  }
  async RechercheTodosOr(criteres?: GetTodoDto): Promise<TodoEntity[]> {
    let qb = this.todoRepository.createQueryBuilder('todo');
    const { critere, status } = criteres;
    if (critere) {
      qb = qb
        .where('todo.name LIKE :critere', { critere: `%${critere}%` })
        .orWhere('todo.description LIKE :critere', { critere: `%${critere}%` });
    }
    if (status) {
      qb = qb.orWhere('todo.status = :status', { status });
    }
    return qb.getMany();
  }

  async RechercheTodosAnd(criteres?: GetTodoDto): Promise<TodoEntity[]> {
    let qb = this.todoRepository.createQueryBuilder('todo');
    const { critere, status } = criteres;
    if (critere) {
      qb = qb
        .where('todo.name LIKE :critere', { critere: `%${critere}%` })
        .orWhere('todo.description LIKE :critere', {
          critere: `%${critere}%`,
        });
    }
    if (status) {
      qb = qb.andWhere('todo.status = :status', { status });
    }
    return qb.getMany();
  }
  async PaginatedTodos(gettodos: GetPaginatedTodosDto): Promise<TodoEntity[]> {
    const { pageNb, itemsNb } = gettodos;
    return await this.todoRepository.find({
      skip: (pageNb - 1) * itemsNb,
      take: itemsNb,
    });
  }
}
