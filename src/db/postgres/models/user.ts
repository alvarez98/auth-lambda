import { DataTypes, Sequelize } from 'sequelize';
import { UserStatic } from '../types/user';

export function UserFactory (sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("Users", {
        WUserID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        WUserEmail: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        WUserFullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        WUserFirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        WUserLastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Inactive: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        Cancelled: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        WUserPassword: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}