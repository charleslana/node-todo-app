import { Router } from 'express';
import TodoController from '../controllers/TodoController';
import { celebrate, Joi, Segments } from 'celebrate';

const todoRouter = Router();
const todoController = new TodoController();

todoRouter.get('/', todoController.index);

todoRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  todoController.show
);

todoRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        description: Joi.string().trim().min(1).max(255).required(),
      },
    },
    { abortEarly: false }
  ),
  todoController.create
);

todoRouter.put(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
      [Segments.BODY]: {
        description: Joi.string().trim().min(1).max(255).required(),
      },
    },
    { abortEarly: false }
  ),
  todoController.update
);

todoRouter.put(
  '/finished/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  todoController.finished
);

todoRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  todoController.delete
);

export default todoRouter;
