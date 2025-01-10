import { Router } from "express";
import auth from "../middleware/Authenticated";
import {
  RequestFeedback,
  SubmitFeedback,
} from "../controller/feedback/feedback";

export const feedbackRouter = Router();

feedbackRouter.post("/submit", auth, SubmitFeedback);
feedbackRouter.get("/", auth, RequestFeedback);

// yet to complete
// feedbackRouter.get("/search/:companyId", auth, SearchFeedback);
