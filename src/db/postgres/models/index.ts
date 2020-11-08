import { UserFactory } from "./user";
import { ApiKeyFactory } from "./apikey";
import { dbConfig } from "../config"

export const Users = UserFactory(dbConfig)
export const ApiKeys = ApiKeyFactory(dbConfig)