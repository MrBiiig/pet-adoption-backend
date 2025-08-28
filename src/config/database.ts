import { Sequelize } from "sequelize";
import config from "./config";

const env = (process.env.NODE_ENV || "development") as keyof typeof config;
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

export default sequelize;
