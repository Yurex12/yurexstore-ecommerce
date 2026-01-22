import 'dotenv/config';

import express from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';

// routes
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import reviewRoutes from './routes/reviewRoutes';
import cartRoutes from './routes/cartRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import addressRoutes from './routes/addressRoutes';
import orderRoutes from './routes/orderRoutes';
import colorRoutes from './routes/colorRoutes';
import adminRoutes from './routes/adminRoutes';
import imagekitRoutes from './routes/imagekitRoutes';
import webHookRoutes from './routes/webHookRoutes';
import paymentRoutes from './routes/paymentRoutes';

import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const PORT = process.env.PORT || 9000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL!],
  }),
);

app.use('/api/stripe', webHookRoutes);

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/imagekit', imagekitRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
