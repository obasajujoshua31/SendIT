import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api';
import auth from './routes/auth';
import JwtAuthenticate from './helpers/jwtAuthenticate';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/auth', auth);
app.use('/api/v1', JwtAuthenticate.jwtVerifyToken, api);
app.all('*', (req, res) => {
  res.json({
    success: false,
    error: 'Page Not Found',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT} `);
});
export default app;
