import { BuildOptions, Model } from "sequelize";
export interface IApiKeyAttributes {
    APIID: number,
    APIKey: string;
    APISecret: string;
    APIExpiration: Date,
    APIStatus: number
}
export interface ApiKeyModel extends Model<IApiKeyAttributes>, IApiKeyAttributes {}
export class ApiKeys extends Model<ApiKeyModel, IApiKeyAttributes> {}
export type ApiKeyStatic = typeof Model & {
   new (values?: object, options?: BuildOptions): ApiKeyModel;
};
