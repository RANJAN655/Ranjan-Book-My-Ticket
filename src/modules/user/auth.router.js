import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import register from "./dto/dto.register.js";
import login from "./dto/login.dto.js";
import { authonation, authorize } from "./auth.middleware.js";
import * as controller from "./auth.controller.js";

const router = Router();

router.post("/register", controller.register);
router.post("/login", validate(login), controller.login);

router.post("/logout", authonation, controller.logout);
router.get("/user", authonation, controller.getMe);
router.get("/verify-email/:token", controller.verifyEmail);

export default router;
