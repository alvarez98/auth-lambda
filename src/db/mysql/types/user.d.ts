import { BuildOptions, Model } from "sequelize";
export interface IUserAttributes {
    WUserID: number,
    WUserEmail: string;
    WUserFullName: string;
    WUserFirstName: string,
    WUserLastName: string,
    Inactive: number,
    Cancelled: number,
    WUserPassword: string
}
export interface UserModel extends Model<IUserAttributes>, IUserAttributes {}
export class Users extends Model<UserModel, IUserAttributes> {}
export type UserStatic = typeof Model & {
   new (values?: object, options?: BuildOptions): UserModel;
};
