import { NextFunction, Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { cookieConfig } from '../config/cookieConfig';
import prisma from '../lib/prisma';
import {
  GoogleLoginSchema,
  LoginSchema,
  RegisterSchema,
  UpdatePasswordSchema,
} from '../schemas/authSchema';
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
        signUpMethod: 'EMAIL',
        role: 'USER',
      },
      omit: {
        password: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      user: newUser,
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

    if (!user || !user.password) {
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
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );

    res.cookie('accessToken', accessToken, cookieConfig);

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
    });
  }
);

//@desc Login With Google
//@route POST api/auth/google-login
//@access public
export const googleLogin = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tokenId } = req.body as GoogleLoginSchema;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name;

    if (!email) {
      res.status(400);
      throw new Error('Google login failed: email not found.');
    }

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || 'John Doe',
          role: 'USER',
          signUpMethod: 'SOCIAL',
        },
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );

    res.cookie('accessToken', accessToken, cookieConfig);

    res.json({
      success: true,
      message: 'Login successful',
      user: user,
    });
  }
);

//@desc get user data
//@route POST api/auth/user
//@access private
export const getUserData = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

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

    res.json({
      success: true,
      message: 'Successful.',
      user,
    });
  }
);

//@desc get user data
//@route POST api/admin/user
//@access private(ADMINS ONLY)
export const getUsersData = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany({
      select: {
        createdAt: true,
        name: true,
        email: true,
      },
    });

    res.json({
      success: true,
      message: 'Successful.',
      users,
    });
  }
);

//@desc Change user password
//@route PATCH api/auth/update-password/
//@access private

export const updateUserPassword = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    const { oldPassword, newPassword } = req.body as UpdatePasswordSchema;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.password) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.role === 'ADMIN' || user.email === 'johndoe@gmail.com') {
      res.status(403);
      throw new Error('Why do you want to change the admin password 🥴');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      res.status(400);
      throw new Error('Old Password is incorrect.');
    }

    if (await bcrypt.compare(newPassword, user.password)) {
      res.status(400);
      throw new Error('New password must be different from old password');
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
