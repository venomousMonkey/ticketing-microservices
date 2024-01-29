import express from 'express';
import 'express-async-errors'; //extends express functionality to work better with async functions
import { json } from 'body-parser';
import cookieSession from 'cookie-session'; //middle-ware to manage cookies
import { errorHandler, NotFoundError } from '@venomousmonkeycorp/common/';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true); // allowing to trust nginx proxy by express
app.use(json());
app.use(
  cookieSession({
    signed: false, //we are not protecting cookie with certificate so adding parameter to make it not required
    secure: process.env.NODE_ENV !== 'test', // when 'true' this allows cookie to be sent only with https, added condition so cookie setup can be tested in jest
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
