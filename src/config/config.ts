import dotenv from "dotenv";
dotenv.config();

// 数据库配置（支持多环境）
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
