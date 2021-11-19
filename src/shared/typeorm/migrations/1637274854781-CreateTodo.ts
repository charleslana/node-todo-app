import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import TodoFinishedEnum from '../../../modules/todo/enumerations/TodoFinishedEnum';

export class CreateTodo1637274854781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todo',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'finished',
            type: 'enum',
            enum: [TodoFinishedEnum.N, TodoFinishedEnum.Y],
            default: `'${TodoFinishedEnum.N}'`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todo');
  }
}
