import { user } from '../types/user.type'; // Adjust the path if necessary

declare global {
  namespace Express {
    interface Request {
      user?: user; // The `user` type imported from your `user.type.ts`
    }
  }
}
