import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

// routes
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import reviewRoutes from './routes/reviewRoutes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const PORT = process.env.PORT || 9000;
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://192.168.0.2:5173', 'http://localhost:5173'],
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

// app.listen(PORT as number, '0.0.0.0', () => {
//   console.log(`Server is running on PORT: ${PORT}`);
// });
