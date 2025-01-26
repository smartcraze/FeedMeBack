import { Router } from "express";
import auth from "../middleware/Authenticated";
import { UpdateProfile } from "../controller/user/updateprofile";
import { DeleteUser } from "../controller/user/DeleteUser";
import { Register } from "../controller/user/Register";
import { Login } from "../controller/user/Login";
import { UserDetails } from "../controller/user/userDetail";
import { SearchUser } from "../controller/user/searchUser";

export const userRouter = Router();

userRouter.post("/signup", Register);
userRouter.post("/signin", Login);
userRouter.get("/me", auth, UserDetails);
userRouter.put("/update", auth, UpdateProfile);
userRouter.delete("/delete", auth, DeleteUser);
userRouter.get("/:username", SearchUser);
