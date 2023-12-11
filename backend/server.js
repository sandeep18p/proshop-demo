import path from 'path';
import express from "express";
import dotenv from 'dotenv'
// import products  from './data/products.js'
import connectDB from './config/db.js'
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 5000;
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import uploadRoutes from './routes/uploadRoutes.js';


connectDB();


const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//it allow us to acces req . cookies
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/upload',uploadRoutes);

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);

//paypal docs
app.use('api/config/paypal', ()=>res.send({clientId: process.env.PAYPAL_CLIENT_ID}));

const __dirname = path.resolve(); //for multer setdirname to current directiry 
  // app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); //multer
  // console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  console.log("lolooolololo");
  console.log(__dirname);
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running1....');
  });
}

app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=>console.log(`Server running on port ${port}`))