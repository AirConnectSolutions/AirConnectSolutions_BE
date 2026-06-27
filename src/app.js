// import express, { urlencoded } from "express";
// import errorMiddleware from "./src/middleware/error.middleware.js";
// import authRoutes from "./src/modules/auth/auth.routes.js"
// import connectDB from "./src/config/db.js";
// import dotenv from "dotenv"
// dotenv.config();
// const app = express()

// connectDB()


// app.use(urlencoded({ extended: false }))
// app.use(express.json())


// app.use("/auth", authRoutes)
// app.use(errorMiddleware)

// app.listen(3000, () => {
//   console.log("running");

// })



import express, { urlencoded } from "express";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

// Global Error Handler
app.use(errorMiddleware);


export default app;