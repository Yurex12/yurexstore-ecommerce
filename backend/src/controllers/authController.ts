import { NextFunction, Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { cookieConfig } from '../config/cookieConfig';
import prisma from '../lib/prisma';
import {
  LoginSchema,
  RegisterSchema,
  UpdatePasswordSchema,
} from '../schemas/authSchema';

//@desc Register a user
//@route POST api/auth/register
//@access public
export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body as RegisterSchema;

    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      res.status(409);
      throw new Error('Email already exist.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
        cart: {},
      },
      omit: {
        password: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      data: { user: newUser },
    });
  }
);

//@desc Login a user
//@route POST api/auth/login
//@access public
export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginSchema;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error('Email or password is incorrect.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401);
      throw new Error('Email or password is incorrect.');
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );

    res.cookie('accessToken', accessToken, cookieConfig);

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
      },
    });
  }
);

//@desc get user data
//@route POST api/auth/user/:id
//@access private
export const getUserData = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (req.user.userId !== user.id && req.user.role !== 'ADMIN') {
      res.status(401);
      throw new Error('Unauthorized.');
    }

    res.json({
      success: true,
      message: 'Successful.',
      data: {
        user,
      },
    });
  }
);

//@desc Change user password
//@route PATCH api/auth/:id/update-password/
//@access private

export const updateUserPassword = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const { oldPassword, newPassword } = req.body as UpdatePasswordSchema;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.id !== req.user.userId && req.user.role !== 'ADMIN') {
      res.status(401);
      throw new Error('Unauthorized to update this password');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      res.status(401);
      throw new Error('Password is incorrect.');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newHashedPassword,
      },
    });

    res.json({
      success: true,
      message: 'Password updated successfully.',
      data: { user: { userId } },
    });
  }
);

//@desc Logout the user and destroy the cookie
//@route POST api/auth/logout
//@access public
export const logoutUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('accessToken', cookieConfig);
    res.json({ success: true, message: 'Logged out' });
  }
);
