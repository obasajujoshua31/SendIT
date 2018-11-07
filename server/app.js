import express from 'express';
import admin from './routes/admin';
import users from './routes/users';

const app = express();

const PORT = process.env.PORT || 5200;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/v1/admin', admin);
app.use('/api/v1/users', users);
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} `);
});


export default app;
