import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import Pet from "./pet.model";

interface AdoptionAttributes {
  id: number;
  userId: number;
  petId: number;
  adoptionDate: Date;
  status: "pending" | "approved" | "rejected";
}

interface AdoptionCreationAttributes
  extends Optional<AdoptionAttributes, "id" | "adoptionDate" | "status"> {}

class Adoption
  extends Model<AdoptionAttributes, AdoptionCreationAttributes>
  implements AdoptionAttributes
{
  public id!: number;
  public userId!: number;
  public petId!: number;
  public adoptionDate!: Date;
  public status!: "pending" | "approved" | "rejected";
}

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
        model: User,
        key: "id",
      },
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pet,
        key: "id",
      },
    },
    adoptionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "adoptions",
  }
);

// 定义模型关联
User.hasMany(Adoption, { foreignKey: "userId" });
Adoption.belongsTo(User, { foreignKey: "userId" });

Pet.hasOne(Adoption, { foreignKey: "petId" });
Adoption.belongsTo(Pet, { foreignKey: "petId" });

export default Adoption;
