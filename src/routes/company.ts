import { Router } from "express";
import { companyLogin, companySignup, getCompanyDetails, getCompanyFeedback } from "../controller/Admin/AdminController";

export const AdminRouter = Router();

// high demands

AdminRouter.post("/signup", companySignup);
AdminRouter.post("/login", companyLogin);
AdminRouter.get("/:companyId", getCompanyDetails);
AdminRouter.get("/:companyId/feedback", getCompanyFeedback);

// yet to complete
// optional
// AdminRouter.get("/me", getCompanyProfile);
// AdminRouter.put("/me", updateCompanyProfile);
// AdminRouter.put("/me/password", changeAdminPassword);
// AdminRouter.get("/search", searchCompanies);
// AdminRouter.delete("/me", deleteCompany);
// AdminRouter.delete("/:companyId", deleteCompanyById);
