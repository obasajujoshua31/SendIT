import express from 'express';
import admin from './routes/admin';
import users from './routes/users';

const PORT = process.env.PORT || 5200;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/users', users);
app.use('/v1/admin', admin);
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} `);
});


export default app;
