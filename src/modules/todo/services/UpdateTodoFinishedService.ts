import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import TodoFinishedEnum from '../enumerations/TodoFinishedEnum';
import UpdateTodoFinishedInterface from '../interfaces/UpdateTodoFinishedInterface';
import Todo from '../typeorm/entities/Todo';
import { TodoRepository } from '../typeorm/repositories/TodoRepository';

class UpdateTodoFinishedService {
  public async execute({ id }: UpdateTodoFinishedInterface): Promise<Todo> {
    const todoRepository = getCustomRepository(TodoRepository);
    const todo = await todoRepository.findOne(id);

    if (!todo) {
      throw new AppError('Tarefa não encontrada.');
    }

    if (todo.finished === TodoFinishedEnum.Y) {
      throw new AppError('A tarefa já se encontra finalizada.');
    }

    todo.finished = TodoFinishedEnum.Y;

    await todoRepository.save(todo);

    return todo;
  }
}

export default UpdateTodoFinishedService;
