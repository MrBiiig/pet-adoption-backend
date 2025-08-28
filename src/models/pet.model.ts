import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface PetAttributes {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  adopted: boolean;
}

interface PetCreationAttributes
  extends Optional<PetAttributes, "id" | "adopted"> {}

class Pet
  extends Model<PetAttributes, PetCreationAttributes>
  implements PetAttributes
{
  public id!: number;
  public name!: string;
  public species!: string;
  public breed!: string;
  public age!: number;
  public description!: string;
  public adopted!: boolean;
}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    adopted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "pets",
  }
);

export default Pet;
