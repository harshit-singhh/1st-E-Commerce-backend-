import express from "express";
import bodyParser from "express";
import connectDB from "./config/db.js";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import paymentRouter from "./Routes/payment.js";
import { notFound, errorHandler } from "./Middlewares/GlobalErrorHandlers.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
connectDB();
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.get("/", (req, res) => res.json({ messge: "This is home route" }));

// user Router
app.use("/api/user", userRouter);

// product Router
app.use("/api/product", productRouter);

// cart Router
app.use("/api/cart", cartRouter);

// address Router
app.use("/api/address", addressRouter);

// payment Router
app.use("/api/payment", paymentRouter);






app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 1000;

app.listen(port, () => console.log(`Server is running on port ${port}`.yellow.underline));
