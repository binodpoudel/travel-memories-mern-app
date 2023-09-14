
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
/* routes*/
app.use('/posts', postRoutes);
app.use("/user", userRouter);
/*  Database connection write your userName and Password */
//const CONNECTION_URL = 'mongodb+srv://Your UserName:Password@cluster0.4xze8.mongodb.net/mernstack?retryWrites=true&w=majority';
const CONNECTION_URL = 'mongodb+srv://binod:binodpoudel@cluster0.4xze8.mongodb.net/mernstack?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);