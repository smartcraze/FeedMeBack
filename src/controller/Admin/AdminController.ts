import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CompanyAdmin from "../../model/CompanyAdmin";
import {
  companyLoginSchema,
  companySchema,
} from "../../schema/CompaniesSchema";

// Company Signup Controller
export async function CompanySignup(req: Request, res: Response) {
  try {
    const { name, email, password, website, logo } = companySchema.parse(
      req.body
    );

    const companyExist = await CompanyAdmin.findOne({ email });
    if (companyExist) {
      return res.status(403).json({
        message: "Company Already Exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the company
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
      return res.status(404).json({
        message: "Company Not Found",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, company.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
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
    const companyId = req.params.companyId;

    if (!companyId) {
      return res.status(400).json({
        message: "Company ID is required",
      });
    }

    const company = await CompanyAdmin.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company Not Found",
      });
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
