import {Column, DataType, Model, Table} from "sequelize-typescript";
@Table({tableName:'user_refresh_token'})
export class Token extends Model{
    @Column({type:DataType.INTEGER,unique:true,primaryKey:true,autoIncrement:true})
    id:number
}