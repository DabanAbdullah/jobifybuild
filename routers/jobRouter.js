import { Router } from "express";
import {
  validateJobInput,
  validateParam,
} from "../middleware/validationMiddleware.js";

import { checkForTestUser } from "../middleware/authMiddleware.js";

import {
  getalljobs,
  getjobbyid,
  createjob,
  updatejob,
  deletejob,
  showStats,
} from "../controllers/jobsController.js";

const router = Router();

// router.get('/', getAllJobs);
// router.post('/', createJob);

router
  .route("/")
  .get(getalljobs)
  .post(validateJobInput, checkForTestUser, createjob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateParam, getjobbyid)
  .patch(validateJobInput, checkForTestUser, validateParam, updatejob)
  .delete(validateParam, checkForTestUser, deletejob);

export default router;
