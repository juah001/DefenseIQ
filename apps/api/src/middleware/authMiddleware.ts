import { Request, Response, NextFunction } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // fake user for now
  (req as any).user = { id: 1, email: "test@example.com" };
  next();
};