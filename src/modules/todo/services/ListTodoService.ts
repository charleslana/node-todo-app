import { getCustomRepository } from 'typeorm';
import Todo from '../typeorm/entities/Todo';
import { TodoRepository } from '../typeorm/repositories/TodoRepository';

class ListTodoService {
  public async execute(): Promise<Todo[]> {
    const todoRepository = getCustomRepository(TodoRepository);

    const todo = await todoRepository.find();

    return todo;
  }
}

export default ListTodoService;
