import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import initUser from "../models/user.model";
import initPet from "../models/pet.model";
import initAdoption from "../models/adoption.model";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "pet_adoption",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  }
);

// 初始化模型（修正后的调用方式）
const User = initUser(sequelize);
const Pet = initPet(sequelize);
const Adoption = initAdoption(sequelize);

// 建立关联关系
User.hasMany(Adoption, { foreignKey: "userId" });
Adoption.belongsTo(User, { foreignKey: "userId" });

Pet.hasMany(Adoption, { foreignKey: "petId" });
Adoption.belongsTo(Pet, { foreignKey: "petId" });

// 同步模型到数据库
sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Database sync error:", err));

export default sequelize;

// 导出模型供其他文件使用
export { User, Pet, Adoption };
