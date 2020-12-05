import { DataTypes, Sequelize } from 'sequelize';
import { ApiKeyStatic } from '../types/apikey';

export function ApiKeyFactory (sequelize: Sequelize): ApiKeyStatic {
    return <ApiKeyStatic>sequelize.define("ApiKeys", {
        APIID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        APIKey: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        APISecret: {
            type: DataTypes.STRING,
            allowNull: false
        },
        APIExpiration: {
            type: DataTypes.DATE,
            allowNull: false
        },
        APIStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, { timestamps: false });
}