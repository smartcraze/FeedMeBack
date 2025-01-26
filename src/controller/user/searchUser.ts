import { Request, Response } from "express";
import User from "../../model/User";

export async function SearchUser(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { username } = req.query;

    if (!userId && !username) {
      res.status(400).json({
        message: "You should be Authenticated to Search for a User.",
      });
      return;
    }

    const query = { username: username };
    const user = await User.findOne(query);
    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }

    res.status(200).json({
      message: "User found.",
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
