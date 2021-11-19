import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import ShowTodoInterface from '../interfaces/ShowTodoInterface';
import Todo from '../typeorm/entities/Todo';
import { TodoRepository } from '../typeorm/repositories/TodoRepository';

class ShowTodoService {
  public async execute({ id }: ShowTodoInterface): Promise<Todo> {
    const todoRepository = getCustomRepository(TodoRepository);

    const todo = await todoRepository.findOne(id);

    if (!todo) {
      throw new AppError('Tarefa não encontrada.');
    }

    return todo;
  }
}

export default ShowTodoService;
