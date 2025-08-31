import { Router } from "express";
import {
  createAdoptionRequest,
  getUserAdoptionRequests,
  getAllAdoptionRequests,
  approveAdoptionRequest,
} from "../controllers/adoption.controller";
import { authenticate, isAdmin } from "../middleware/auth.middleware";

const router = Router();

// 提交领养申请（需要登录）
router.post("/", authenticate, createAdoptionRequest);

// 获取当前用户的领养申请（需要登录）
router.get("/my-requests", authenticate, getUserAdoptionRequests);

// 获取所有领养申请（需要管理员权限）
router.get("/", authenticate, isAdmin, getAllAdoptionRequests);

// 审批领养申请（需要管理员权限）
router.patch("/:id", authenticate, isAdmin, approveAdoptionRequest);

export default router;
