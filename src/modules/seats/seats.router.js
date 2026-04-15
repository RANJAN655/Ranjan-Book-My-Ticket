import { Router } from "express";
import * as controller from "./seats.controller.js";
import { authorize, authonation } from "../user/auth.middleware.js";

const router = Router();

router.get("/", controller.getSeats);
router.put("/:id", authonation, authorize("customer"), controller.bookSeat);

export default router;
