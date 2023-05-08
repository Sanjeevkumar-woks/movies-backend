import { genPassword, createUser,getAllusers,getUserByName } from '../helper.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import express from 'express';
const router = express.Router();

// Insert User
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const isUserExist = await getUserByName(username);
    console.log(isUserExist);
    if(isUserExist) {
        res.status(400).send({ message: "Username already taken"});
        return;
    }
    if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)) {
        res.status(400).send({ message: "Password pattern does not match"});
        return;
    }
    const hashedPassword = await genPassword(password);
    const result = await createUser(username, hashedPassword);
    res.send(result);
});

// login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);
    if(!userFromDB) {
        res.status(400).send( {message: "Invalid Credentials"} );
        return;
    }
    const storedDbPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);
    if(!isPasswordMatch) {
        res.status(400).send( {message: "Invalid Credentials"} );
        return;
    }

    const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY);
    res.send({message: "Successful login", token: token});
})


router.get('/', async (req, res) => {
    console.log(req.query);
    const users = await getAllusers(req);
    res.send(users);
});

export const usersRouter = router;
