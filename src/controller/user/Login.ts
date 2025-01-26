import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logedinuser } from "../../schema/userschema";
import User from "../../model/User";

export async function Login(req: Request, res: Response) {
  try {
    const { username, password } = logedinuser.parse(req.body);

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        Message: "User Not Found",
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        Message: "Password Wrong ",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    res.status(200).json({
      Message: "User Logged In",
      token: token,
    });
  } catch (error: any) {
    res.status(500).json({
      Message: "Internal Server Error",
      error: error.message,
    });
  }
}
