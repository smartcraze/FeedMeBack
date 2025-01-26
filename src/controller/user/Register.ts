import { Request, Response } from "express";
import { userSchema } from "../../schema/userschema";
import User from "../../model/User";
import bcrypt from "bcrypt";

export async function Register(req: Request, res: Response) {
  try {
    const { name, email, password, username } = userSchema.parse(req.body);

    const userExist = await User.findOne({ username });
    if (userExist) {
      res.status(403).json({
        Message: "User Already Exist",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      username,
      password: hashedpassword,
    });

    res.status(200).json({
      Message: "User Created",
    });
  } catch (error: any) {
    res.status(500).json({
      Message: "Internal Server Error",
      error: error.message,
    });
  }
}
