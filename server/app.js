import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import api from './routes/api';
import auth from './routes/auth';
import account from './routes/account';
import JwtAuthenticate from './helpers/jwtAuthenticate';
import swaggerDocument from './swagger.json';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', auth);
app.use('/api/v1/account', account);
app.use('/api/v1', JwtAuthenticate.jwtVerifyToken, api);
app.all('*', (req, res, next) => {
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
