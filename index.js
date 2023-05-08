import express from 'express';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { moviesRouter } from './routes/movies.js';
import { usersRouter } from './routes/users.js';
import { theatersRouter } from './routes/theaters.js';
import { bookingsRouter } from './routes/bookings.js';
import { paymentRoutes } from './routes/payments.js';

const app = express();
const PORT = process.env.PORT || 9200;

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URI;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}

//Top level await - new feature
export const client = await createConnection(); 

// Rest API endpoints

app.use(express.json());
// To allow cors
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to express.js');
})

app.use('/movies', moviesRouter);

app.use('/theaters', theatersRouter);

app.use('/bookings', bookingsRouter);

app.use('/users', usersRouter);

app.use("/api/payment/", paymentRoutes);

app.listen(PORT, () => {
    console.log('Server started on port ', PORT);
});
