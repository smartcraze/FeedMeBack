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

    const ExistingUser = await User.findById({ userId });
    if (!ExistingUser) {
      res.status(404).json({
        message: "User Not Found",
      });
      return;
    }
 
    if (username) ExistingUser.username = username;
    if (name) ExistingUser.name = name;
    if (email) ExistingUser.email = email;
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
