import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api';
import auth from './routes/auth';
import JwtAuthenticate from './helpers/jwtAuthenticate';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', JwtAuthenticate.jwtVerifyToken, api);
app.use('/auth', auth);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT} `);
});
export default app;
