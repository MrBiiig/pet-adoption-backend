import { Request, Response } from "express";
import sequelize from "../config/database";
// 从数据库配置文件导入模型
import { Adoption, Pet } from "../config/database";

// 提交领养申请（普通用户）
export const createAdoptionRequest = async (req: Request, res: Response) => {
  const t = await sequelize.transaction(); // 创建事务

  try {
    const { petId, reason } = req.body;
    const userId = req.user!.id;

    // 验证必填字段
    if (!petId || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 检查宠物是否存在且未被领养
    const pet = await Pet.findByPk(petId, { transaction: t });
    if (!pet) {
      await t.rollback();
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.adopted) {
      await t.rollback();
      return res.status(400).json({ message: "This pet is already adopted" });
    }

    // 检查是否已对该宠物提交过申请
    const existingRequest = await Adoption.findOne({
      where: { userId, petId },
      transaction: t,
    });

    if (existingRequest) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "You have already applied for this pet" });
    }

    // 创建领养申请
    const adoptionRequest = await Adoption.create(
      {
        userId,
        petId,
        reason,
        status: "pending",
      },
      { transaction: t }
    );

    await t.commit(); // 提交事务
    res.status(201).json(adoptionRequest);
  } catch (error) {
    await t.rollback(); // 出错时回滚事务
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 获取当前用户的领养申请（普通用户）
export const getUserAdoptionRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const requests = await Adoption.findAll({
      where: { userId },
      include: [{ model: Pet, attributes: ["id", "name", "species", "breed"] }],
    });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 获取所有领养申请（管理员）
export const getAllAdoptionRequests = async (req: Request, res: Response) => {
  try {
    const requests = await Adoption.findAll({
      include: [{ model: Pet, attributes: ["id", "name", "species", "breed"] }],
    });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 审批领养申请（管理员）
export const approveAdoptionRequest = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { status } = req.body;

    // 验证状态是否合法
    if (!["approved", "rejected"].includes(status)) {
      await t.rollback();
      return res.status(400).json({ message: "Invalid status value" });
    }

    // 查找申请
    const request = await Adoption.findByPk(id, { transaction: t });
    if (!request) {
      await t.rollback();
      return res.status(404).json({ message: "Adoption request not found" });
    }

    // 如果申请已处理，不允许再次处理
    if (request.status !== "pending") {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }

    // 更新申请状态
    request.status = status as "approved" | "rejected";
    await request.save({ transaction: t });

    // 如果批准领养，更新宠物状态为已领养
    if (status === "approved") {
      await Pet.update(
        { adopted: true },
        { where: { id: request.petId }, transaction: t }
      );
    }

    await t.commit();
    res.json(request);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
