import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import jwtConfig from '../config/jwt';
import User, { IUser } from '../models/User';

function createToken(user: IUser): string {
    const { id, email } = user;

    return jwt.sign({ id, email }, jwtConfig.JWT_SECRET, {
        expiresIn: 864000,
    });
}

export async function signup(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: 'Please, send email and password' });
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: 'Email is already taken' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return res.status(201).json(newUser);
}

export async function signin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: 'Please, send email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Email does not exists' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Email or password are invalid' });
    }

    return res.status(202).json({ token: createToken(user) });
}
