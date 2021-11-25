import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController.js";
import * as financialController from "./controllers/financialController.js";
import { authMiddle } from "./middlewares/authMiddle.js";
import connection from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.post(
  "/financial-events",
  authMiddle,
  financialController.postFinancialEvent
);

app.get(
  "/financial-events",
  authMiddle,
  financialController.getFinancialEvents
);

app.get(
  "/financial-events/sum",
  authMiddle,
  financialController.getFinancialEventsSum
);

export default app;
