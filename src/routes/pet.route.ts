import { Router } from "express";
import {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
} from "../controllers/pet.controller";
import { authenticate, isAdmin } from "../middleware/auth.middleware";

const router = Router();

// 获取所有宠物（不需要登录即可访问）
router.get("/", getAllPets);

// 获取单个宠物详情（不需要登录即可访问）
router.get("/:id", getPetById);

// 创建宠物（需要管理员权限）
router.post("/", authenticate, isAdmin, createPet);

// 更新宠物信息（需要管理员权限）
router.put("/:id", authenticate, isAdmin, updatePet);

export default router;
