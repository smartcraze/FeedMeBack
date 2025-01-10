import { Router } from "express";
import { Login, Register, UserDetails } from "../controller/user/user";
import auth from "../middleware/Authenticated";

export const userRouter = Router();

userRouter.post("/signup", Register);
userRouter.post("/signin", Login);
userRouter.get("/me", auth, UserDetails);

// yet to complete
// optional
// userRouter.put("/me", UpdateProfile);
// userRouter.put("/me/password", ChangePassword);
// userRouter.delete("/me", DeleteAccount);
// userRouter.get("/search", SearchUsers);
// userRouter.get("/:userId", UserDetailsById);
