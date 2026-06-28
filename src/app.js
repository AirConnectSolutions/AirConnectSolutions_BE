import express, { urlencoded } from "express";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import cors from "cors"

const app = express();

// Middlewares
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Air Connect Solutions Backend Server is running successfully!"
  });
});

app.use("/api/v1/auth", authRoutes);

// Global Error Handler
app.use(errorMiddleware);


export default app;