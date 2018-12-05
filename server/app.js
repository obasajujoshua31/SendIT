import express from 'express';
import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
import api from './routes/api';
import auth from './routes/auth';
import JwtAuthenticate from './helpers/jwtAuthenticate';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/auth', auth);
app.use('/api/v1', JwtAuthenticate.jwtVerifyToken, api);
app.all('*', (req, res, next) => {
  //
  const err = new Error();
  err.message = 'Page Not Found';
  return next(err);
});

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 404;
  }
  if (!err.message) {
    err.message = 'Bad Request';
  }
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT} `);
});
export default app;
