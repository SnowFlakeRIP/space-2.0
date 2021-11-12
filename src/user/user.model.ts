import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'users',createdAt:false,updatedAt:false})
export class User extends Model {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING})
    password: string
}