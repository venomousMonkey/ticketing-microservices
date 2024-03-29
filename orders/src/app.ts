import express from 'express';
import 'express-async-errors'; //extends express functionality to work better with async functions
import { json } from 'body-parser';
import cookieSession from 'cookie-session'; //middle-ware to manage cookies
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@venomousmonkeycorp/common/';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';
import { newOrderRouter } from './routes/new';

const app = express();
app.set('trust proxy', true); // allowing to trust nginx proxy by express
app.use(json());
app.use(
  cookieSession({
    signed: false, //we are not protecting cookie with certificate so adding parameter to make it not required
    secure: false, // process.env.NODE_ENV !== 'test',  when 'true' this allows cookie to be sent only with https, added condition so cookie setup can be tested in jest
  })
);
app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
