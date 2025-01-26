import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../model/User";
import { logedinuser, userSchema } from "../../schema/userschema";



export async function UserDetails(req: Request, res: Response) {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(400).json({
        message: "User ID is missing",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "User details retrieved successfully",
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
