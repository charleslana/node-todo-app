import { EntityRepository, Repository } from 'typeorm';
import Todo from '../entities/Todo';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  public async findByDescription(
    description: string
  ): Promise<Todo | undefined> {
    const todo = this.findOne({
      where: {
        description,
      },
    });

    return todo;
  }
}
