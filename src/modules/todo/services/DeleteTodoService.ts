import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import DeleteTodoInterface from '../interfaces/DeleteTodoInterface';
import { TodoRepository } from '../typeorm/repositories/TodoRepository';

class DeleteTodoService {
  public async execute({ id }: DeleteTodoInterface): Promise<void> {
    const todoRepository = getCustomRepository(TodoRepository);

    const todo = await todoRepository.findOne(id);

    if (!todo) {
      throw new AppError('Tarefa não encontrada.');
    }

    await todoRepository.remove(todo);
  }
}

export default DeleteTodoService;
