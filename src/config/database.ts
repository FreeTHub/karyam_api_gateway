import OTPModel from "@/schema/otpModel.schema";
import UserModel from "@/schema/user.schema";
import "colors";
import { config } from "dotenv";
import { Sequelize } from "sequelize";
config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE!,
  process.env.POSTGRES_USER!,
  process.env.POSTGRES_PASSWORD!,
  {
    dialect: "postgres",
    host: process.env.POSTGRES_HOST!,
    port: +process.env.POSTGRES_PORT!,
    timezone: "+05:30",
    query: { raw: true },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      underscored: true,
      freezeTableName: true,
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false,
    },
    pool: {
      min: 10,
      max: 50,
      acquire: 30000,
      idle: 10000,
    },
    logQueryParameters: process.env.NODE_ENV === "development",
    logging: true,
    benchmark: true,
  }
);

  sequelize.authenticate().then(()=>{
    console.log("POSTGRES database connected".bgMagenta.underline)
  });

  sequelize.authenticate();
 const POSTGRESDB={
    // GoalDefiniition:GoalDefiniitionModel(sequelize),
    // Breakdown:BreakdownModel(sequelize),
    // KPI:KPIModel(sequelize),
    // Domains:DomainModel(sequelize),
		UserModel:UserModel(sequelize),
		OTPModel:OTPModel(sequelize),
    sequelize,
    Sequelize
 }
 export default POSTGRESDB;