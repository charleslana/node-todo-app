import { Router } from 'express';
import todoRouter from '../../../modules/todo/routes/todo.routes';

const routes = Router();

routes.use('/todo', todoRouter);

export default routes;
