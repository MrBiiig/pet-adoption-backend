import { DataTypes, Model, Sequelize } from "sequelize";

// 定义宠物模型类
class Pet extends Model {
  public id!: number;
  public name!: string;
  public species!: string;
  public breed!: string;
  public age!: number;
  public description!: string;
  public adopted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 初始化函数 - 直接返回模型类
export default function initPet(sequelize: Sequelize) {
  Pet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      adopted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "pets",
    }
  );

  return Pet;
}
