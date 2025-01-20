import { Request, Response } from "express";
import User from "../../model/User";

export async function DeleteUser(req: Request, res: Response) {
  try {
    const { username, userId } = req.body;

    if (!username && !userId) {
      res.status(400).json({
        message:
          "Please provide either a username or a userId to delete the user.",
      });
      return;
    }
    const query: any = username ? { username } : { _id: userId };

    const deletedUser = await User.findOneAndDelete(query);

    if (!deletedUser) {
      res.status(404).json({
        message: "User not found. Unable to delete.",
      });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: {
        username: deletedUser.username,
        name: deletedUser.name,
        email: deletedUser.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
