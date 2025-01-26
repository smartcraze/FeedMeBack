import { Router } from "express";
import {
  CompanyLogin,
  CompanySignup,
  GetCompanyDetails,
  getCompanyFeedback,
} from "../controller/Admin/AdminController";
import { AdminMiddleware } from "../middleware/Authenticated";

export const AdminRouter = Router();

AdminRouter.post("/signup", CompanySignup);
AdminRouter.post("/login", CompanyLogin);
// authenticated

AdminRouter.get("/details", AdminMiddleware, GetCompanyDetails);

AdminRouter.get("/feedback", AdminMiddleware, getCompanyFeedback);

// Optional Authenticated Routes (Require Admin Middleware)
// AdminRouter.get("/me", AdminMiddleware, getCompanyProfile);
// AdminRouter.put("/me", AdminMiddleware, updateCompanyProfile);
// AdminRouter.put("/me/password", AdminMiddleware, changeAdminPassword);
// AdminRouter.get("/search", AdminMiddleware, searchCompanies);
// AdminRouter.delete("/me", AdminMiddleware, deleteCompany);
// AdminRouter.delete("/:companyId", AdminMiddleware, deleteCompanyById);
