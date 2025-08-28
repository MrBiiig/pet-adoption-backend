export default {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "pet_adoption",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql" as const,
  },
};
