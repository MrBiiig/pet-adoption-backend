import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// 从数据库配置文件导入User模型，而不是直接从模型文件导入
import { User } from "../config/database";
import { JWT_SECRET } from "../config/config";

// 生成JWT令牌
const generateToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

// 用户注册
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // 验证必填字段
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // 检查邮箱是否已被注册
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 密码加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建用户
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // 生成令牌
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 用户登录
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 验证必填字段
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // 查找用户
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 生成令牌
    const token = generateToken(user.id, user.role);

    res.json({
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
