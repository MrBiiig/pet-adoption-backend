import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "user";

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users",
    hooks: {
      beforeSave: async (user: User) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
