import { Router, Request, Response, NextFunction } from 'express'; // Import NextFunction
import { signup } from '../Controller/Auth';

const router = Router();

router.route("/signup").post(async (req: Request, res: Response, next: NextFunction) => { // Add type for next
  try {
    await signup(req, res); // Call the signup controller function
  } catch (error) {
    next(error); // Pass the error to the next middleware for error handling
  }
});

export default router;
