import { Request, Response } from "express";
// 从数据库配置文件导入Pet模型
import { Pet } from "../config/database";

// 创建宠物（仅管理员）
export const createPet = async (req: Request, res: Response) => {
  try {
    const { name, species, breed, age, description } = req.body;

    // 验证必填字段
    if (!name || !species || !breed || !age) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const pet = await Pet.create({
      name,
      species,
      breed,
      age,
      description: description || "",
      adopted: false,
    });

    res.status(201).json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 获取所有宠物
export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 根据ID获取宠物
export const getPetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 更新宠物信息（仅管理员）
export const updatePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, species, breed, age, description, adopted } = req.body;

    const pet = await Pet.findByPk(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // 更新宠物信息（只更新提供的字段）
    if (name !== undefined) pet.name = name;
    if (species !== undefined) pet.species = species;
    if (breed !== undefined) pet.breed = breed;
    if (age !== undefined) pet.age = age;
    if (description !== undefined) pet.description = description;
    if (adopted !== undefined) pet.adopted = adopted;

    await pet.save();
    res.json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
