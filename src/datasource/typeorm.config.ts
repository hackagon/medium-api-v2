import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as datasource from "./datasource.config.json"

const { host, port, database, username, password } = datasource[process.env.NODE_ENV || "local"]

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host,
  port,
  username,
  password,
  database,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true
}