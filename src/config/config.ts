import dotenv from "dotenv";
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql" as const,
  },
  test: {
    // 测试环境配置
  },
  production: {
    // 生产环境配置
  },
};

export default {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "pet_adoption",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql" as const,
  },
  test: {
    // 测试环境配置
  },
  production: {
    // 生产环境配置
  },
};

export const JWT_SECRET = process.env.JWT_SECRET as string;
