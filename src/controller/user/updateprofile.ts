import { Request, Response } from "express";
import { updateProfileZod } from "../../schema/userschema";
import User from "../../model/User";
import bcrypt from "bcrypt";

export async function UpdateProfile(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { username, name, email, password } = updateProfileZod.parse(
      req.body
    );

    const ExistingUser = await User.findById(userId);

    if (!ExistingUser) {
      res.status(404).json({
        message: "User Not Found",
      });
      return;
    }

    if (username && username !== ExistingUser.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        res.status(400).json({
          message: "Username already in use",
        });
      }
      ExistingUser.username = username;
    }

    if (email && email !== ExistingUser.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        res.status(400).json({
          message: "Email already in use",
        });
      }
      ExistingUser.email = email;
    }

    if (name) ExistingUser.name = name;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      ExistingUser.password = hashedPassword;
    }
    await ExistingUser.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: ExistingUser.username,
        name: ExistingUser.name,
        email: ExistingUser.email,
        createdAt: ExistingUser.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
