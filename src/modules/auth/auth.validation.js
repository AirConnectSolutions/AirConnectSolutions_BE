import { z } from "zod";

// 1. Signup Validation 
export const signupSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, "Name must be at least 3 characters long"),

    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Invalid email format")
      .toLowerCase(),

    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),

    role: z
      .enum(["admin", "agent", "superadmin"], {
        errorMap: () => ({ message: "Role must be admin, agent, or superadmin" })
      })
      .default("agent")
  })
});

// 2. Login Validation Rules 
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Invalid email format")
      .toLowerCase(),

    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password cannot be empty")
  })
});