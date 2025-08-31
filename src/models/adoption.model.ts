import { DataTypes, Model, Sequelize } from "sequelize";

// 定义领养申请模型类
class Adoption extends Model {
  public id!: number;
  public userId!: number;
  public petId!: number;
  public reason!: string;
  public status!: "pending" | "approved" | "rejected";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 初始化函数 - 直接返回模型类
export default function initAdoption(sequelize: Sequelize) {
  Adoption.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "pets",
          key: "id",
        },
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "adoptions",
    }
  );

  return Adoption;
}
