import { Router } from "express";
import { RequestFeedback, SubmitFeedback } from "../controller/feedback";
import auth from "../middleware/Authenticated";

export const feedbackRouter = Router();

feedbackRouter.post("/", auth, SubmitFeedback);
feedbackRouter.get("/", auth, RequestFeedback);
