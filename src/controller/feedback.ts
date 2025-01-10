import { Request, Response } from "express";
import feedbackSchemaZod from "../schema/FeedbackSchema";
import Feedback from "../model/Feedback";

export async function SubmitFeedback(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const { feedbackText, rating, customerEmail, customerName } =
      feedbackSchemaZod.parse(req.body);

    const feedback = await Feedback.create({
      userId,
      feedbackText,
      rating,
      customerEmail,
      customerName,
    });
    await feedback.populate("userId", "username");
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function RequestFeedback(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const feedback = await Feedback.find({ userId });
    res.json(feedback);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
