import { Request, Response } from 'express';
import CreateTodoService from '../services/CreateTodoService';
import DeleteTodoService from '../services/DeleteTodoService';
import ListTodoService from '../services/ListTodoService';
import ShowTodoService from '../services/ShowTodoService';
import UpdateTodoFinishedService from '../services/UpdateTodoFinishedService';
import UpdateTodoService from '../services/UpdateTodoService';

export default class TodoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const createTodoService = new CreateTodoService();

    const todo = await createTodoService.execute({ description: description });

    return response.status(201).json(todo);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTodoService = new DeleteTodoService();

    const todo = await deleteTodoService.execute({
      id: parseInt(id),
    });

    return response.status(204).json([]);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listTodoService = new ListTodoService();

    const todo = await listTodoService.execute();

    return response.json(todo);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTodoService = new ShowTodoService();

    const todo = await showTodoService.execute({ id: parseInt(id) });

    return response.json(todo);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const { id } = request.params;

    const updateTodoService = new UpdateTodoService();

    const todo = await updateTodoService.execute({
      id: parseInt(id),
      description: description,
    });

    return response.json(todo);
  }

  public async finished(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const updateTodoFinishedService = new UpdateTodoFinishedService();

    const todo = await updateTodoFinishedService.execute({
      id: parseInt(id),
    });

    return response.json(todo);
  }
}
