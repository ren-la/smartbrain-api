import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt-nodejs';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123',
    database : 'smartbrain'
  }
});

const app = express();
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json(database.users);
});

app.post('/signin', handleSignIn(db, bcrypt));

app.post('/register', handleRegister(db, bcrypt));

app.get('/profile/:id', handleProfileGet(db));

app.post('/imageurl', handleApiCall());

app.put('/image', handleImage(db));
