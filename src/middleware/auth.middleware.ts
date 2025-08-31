import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

// 扩展Request类型，添加user属性
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: "admin" | "user";
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 获取请求头中的token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      role: "admin" | "user";
    };

    // 将用户信息添加到请求对象
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// 管理员权限验证中间件
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied: Admin role required" });
  }
  next();
};
