import dotenv from "dotenv";
dotenv.config();

// 定义数据库配置类型
interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: "mysql";
}

// 数据库配置（支持多环境）
const config: Record<string, DbConfig> = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "pet_adoption",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "pet_adoption_test",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "pet_adoption",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  },
};

export default config;

export const JWT_SECRET = process.env.JWT_SECRET as string;
