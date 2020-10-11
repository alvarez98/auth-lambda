import { UserFactory } from "./user";
import { dbConfig } from "../config"

export const Users = UserFactory(dbConfig)