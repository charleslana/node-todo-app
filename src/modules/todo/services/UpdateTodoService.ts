import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import TodoFinishedEnum from '../enumerations/TodoFinishedEnum';
import UpdateTodoInterface from '../interfaces/UpdateTodoInterface';
import Todo from '../typeorm/entities/Todo';
import { TodoRepository } from '../typeorm/repositories/TodoRepository';

class UpdateTodoService {
  public async execute({
    id,
    description,
  }: UpdateTodoInterface): Promise<Todo> {
    const todoRepository = getCustomRepository(TodoRepository);
    const todo = await todoRepository.findOne(id);

    if (!todo) {
      throw new AppError('Tarefa não encontrada.');
    }

    if (todo.finished === TodoFinishedEnum.Y) {
      throw new AppError(
        'Não é possível atualizar uma tarefa que já se encontra finalizada.'
      );
    }

    const todoExists = await todoRepository.findByDescription(description);

    if (todoExists && description !== todo.description) {
      throw new AppError('Já existe uma tarefa com a mesma descrição.');
    }

    todo.description = description;

    await todoRepository.save(todo);

    return todo;
  }
}

export default UpdateTodoService;
