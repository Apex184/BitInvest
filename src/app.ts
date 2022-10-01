import createError from 'http-errors';
import  express, {Response, Request, NextFunction} from  'express';
import  path from 'path';
import  cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/db.config';



// db.sync()
  db.sync({ force: true })
  .then(() => {
    console.log('Successfully connected to the Database');
  })
  .catch((Error) => {
    console.log('Unable to connect to the database');
    // throw new Error('Unable to connect to the database');
  });

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

export default app;


