import { z } from "zod";

const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const createServerValidation = z.object({
  body: z.object({
    server_description: z
      .string({ required_error: "Server description is required" })
      .trim()
      .min(3, { message: "Description must be at least 3 characters long" })
      .max(200, { message: "Description cannot exceed 200 characters" }),

    server_ip: z
      .string({ required_error: "Server IP address is required" })
      .trim()
      .regex(ipRegex, { message: "Invalid IP address format (e.g., 192.168.1.1)" }),

    active: z
      .enum(["Yes", "No"], {
        errorMap: () => ({ message: "Active must be either 'Yes' or 'No'" }),
      })
      .default("Yes"),

    telnet_host: z
      .string({ required_error: "Telnet host is required" })
      .trim()
      .min(1, { message: "Telnet host cannot be empty" }),

    telnet_port: z
      .number({
        required_error: "Telnet port is required",
        invalid_type_error: "Telnet port must be a number"
      })
      .int({ message: "Port must be an integer" })
      .min(1, { message: "Port number must be greater than 0" })
      .max(65535, { message: "Port number cannot exceed 65535" })
      .default(3306)
      .optional(),

    user_manager: z
      .string()
      .trim()
      .default("acs")
      .optional(),

    secret_manager: z
      .string()
      .trim()
      .default("acs")
      .optional(),

    update_manager: z
      .string()
      .trim()
      .default("updateacs")
      .optional(),

    listen_manager: z
      .string()
      .trim()
      .default("listenacs")
      .optional(),

    send_manager: z
      .string()
      .trim()
      .default("sendacs")
      .optional(),

    remote_telnet_host: z
      .string({ required_error: "Remote telnet host is required" })
      .trim()
      .min(1, { message: "Remote telnet host cannot be empty" }),
  }).strict({
    message: "Extra fields or custom 'server_id' are not allowed!"

  }),
});


export const updateServerValidation = z.object({
  body: createServerValidation.shape.body.partial()
});