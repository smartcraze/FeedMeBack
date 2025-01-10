import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CompanyAdmin from "../../model/CompanyAdmin";
import {
  companyLoginSchema,
  companySchema,
} from "../../schema/CompaniesSchema";
import Feedback from "../../model/Feedback";

// Company Signup Controller
export async function CompanySignup(req: Request, res: Response) {
  try {
    const { name, email, password, website, logo } = companySchema.parse(
      req.body
    );

    const companyExist = await CompanyAdmin.findOne({ email });
    if (companyExist) {
      res.status(403).json({
        message: "Company Already Exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await CompanyAdmin.create({
      name,
      email,
      password: hashedPassword,
      website,
      logo,
    });

    res.status(200).json({
      message: "Company Created Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Company Login Controller
export async function CompanyLogin(req: Request, res: Response) {
  try {
    const { email, password } = companyLoginSchema.parse(req.body);

    const company = await CompanyAdmin.findOne({ email });
    if (!company) {
      res.status(404).json({
        message: "Company Not Found",
      });
      return;
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, company.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        message: "Incorrect Password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: company._id },
      process.env.JWT_ADMIN_SECRET as string
    );

    res.status(200).json({
      message: "Company Logged In Successfully",
      token: token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Get Company Details Controller
export async function GetCompanyDetails(req: Request, res: Response) {
  try {
    const companyId = req.AdminId;

    if (!companyId) {
      res.status(400).json({
        message: "Company ID is required Admin Should be Authenticated",
      });
      return;
    }

    const company = await CompanyAdmin.findById(companyId);

    if (!company) {
      res.status(404).json({
        message: "Company Not Found",
      });
      return;
    }

    res.status(200).json({
      message: "Company details retrieved successfully",
      company: {
        name: company.name,
        email: company.email,
        website: company.website,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getCompanyFeedback(req: Request, res: Response) {
  try {
    const companyId = req.AdminId;

    if (!companyId) {
      res.status(400).json({
        message: "Company ID is required. Admin should be authenticated.",
      });
      return;
    }

    const company = await Feedback.findById(companyId).populate(
      "userId",
      "username"
    );

    if (!company) {
      res.status(404).json({
        message: "Company Not Found",
      });
      return;
    }

    res.status(200).json({
      message: "Company feedback retrieved successfully",
      feedbacks: company,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
