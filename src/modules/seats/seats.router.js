import { Router } from "express";
import * as controller from "./seats.controller.js";

const router = Router();

router.get("/", controller.getSeats);
router.put("/:id", controller.bookSeat);

export default router;
