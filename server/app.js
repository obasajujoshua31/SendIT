import express from 'express';
import api from './routes/api';

const PORT = process.env.PORT || 5200;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', api);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} `);
});
export default app;
