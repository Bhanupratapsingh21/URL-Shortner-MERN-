import { Router } from 'express';
import {
  signup,
  welcome,
  login,
  logout,
  refreshAccessToken,
  changeuserCurrentPassword,
  changeusername,
  getuser,
} from '../controller/Auth';
import { authMiddleware } from '../middleware/auth.Middleware';

// Create a new router instance
const router = Router();

// Define routes using Router methods
router.post("/signup", async (req, res, next) => {
  try {
    await signup(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/logout", authMiddleware, async (req, res, next) => {
  try {
    await logout(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/changeuserCurrentPassword", authMiddleware, async (req, res, next) => {
  try {
    await changeuserCurrentPassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/changeusername", authMiddleware, async (req, res, next) => {
  try {
    await changeusername(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/refreshAccessToken", authMiddleware, async (req, res, next) => {
  try {
    await refreshAccessToken(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/getuser", authMiddleware, async (req, res, next) => {
  try {
    await getuser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/welcome", async (req, res, next) => {
  try {
    await welcome(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;