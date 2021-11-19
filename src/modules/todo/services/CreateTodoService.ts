import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import TodoFinishedEnum from '../enumerations/TodoFinishedEnum';
import CreateTodoInterface from '../interfaces/CreateTodoInterface';
import Todo from '../typeorm/entities/Todo';
import { TodoRepository } from '../typeorm/repositories/TodoRepository';

class CreateTodoService {
  public async execute({ description }: CreateTodoInterface): Promise<Todo> {
    const todoRepository = getCustomRepository(TodoRepository);
    const todoExists = await todoRepository.findByDescription(description);

    if (todoExists) {
      throw new AppError('Já existe uma tarefa com a mesma descrição.');
    }

    const todo = todoRepository.create({
      description,
    });

    await todoRepository.save(todo);

    return todo;
  }
}

export default CreateTodoService;
