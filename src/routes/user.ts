import { Router } from "express";
import { Login, Register, UserDetails } from "../controller/user/user";
import auth from "../middleware/Authenticated";
import { UpdateProfile } from "../controller/user/updateprofile";
import { DeleteUser } from "../controller/user/DeleteUser";

export const userRouter = Router();

userRouter.post("/signup", Register);
userRouter.post("/signin", Login);
userRouter.get("/me", auth, UserDetails);
userRouter.put("/update", auth, UpdateProfile);
userRouter.delete("/delete",auth, DeleteUser);

// userRouter.get("/search", SearchUsers);

