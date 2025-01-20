import { Request, Response } from "express";
import User from "../../model/User";

export async function SearchUser(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const { username } = req.query;

    // Validate inputs
    if (!userId && !username) {
      return res.status(400).json({
        message: "Please provide either a userId or a username to search.",
      });
    }

    // Build query based on the provided parameter
    const query: any = userId ? { _id: userId } : { username };

    // Find the user
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Respond with the user data
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
