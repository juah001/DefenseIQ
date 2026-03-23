import { Request, Response, NextFunction } from "express";

const requests = new Map<string, { count: number; timestamp: number }>();

export function basicRateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 100;

  const existing = requests.get(ip);

  if (!existing || now - existing.timestamp > windowMs) {
    requests.set(ip, { count: 1, timestamp: now });
    return next();
  }

  if (existing.count >= maxRequests) {
    return res.status(429).json({ message: "Too many requests" });
  }

  existing.count += 1;
  requests.set(ip, existing);
  return next();
}
