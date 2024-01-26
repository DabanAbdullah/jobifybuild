import { Router } from "express";
import {
  validateUserInput,
  validateParam,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

import { Login, Register, logout } from "../controllers/authController.js";

const router = Router();

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.post("/register", validateUserInput, Register);
router.post("/login", validateLoginInput, Login);
router.get("/logout", logout);

export default router;
