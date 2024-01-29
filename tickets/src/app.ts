import express from 'express';
import 'express-async-errors'; //extends express functionality to work better with async functions
import { json } from 'body-parser';
import cookieSession from 'cookie-session'; //middle-ware to manage cookies
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@venomousmonkeycorp/common/';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true); // allowing to trust nginx proxy by express
app.use(json());
app.use(
  cookieSession({
    signed: false, //we are not protecting cookie with certificate so adding parameter to make it not required
    secure: process.env.NODE_ENV !== 'test', // when 'true' this allows cookie to be sent only with https, added condition so cookie setup can be tested in jest
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
