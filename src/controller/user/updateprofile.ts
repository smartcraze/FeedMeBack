import { Request } from "express";
import { updateProfileZod } from "../../schema/userschema";
import User from "../../model/User";

export async function UpdateProfile(req: Request, res: Response) {
  try {
    const { username } = updateProfileZod.parse(req.body);
     const ExistingUser = await User.findOne({username});
     if(!ExistingUser){
        
     }
  } catch (error) {}
}
