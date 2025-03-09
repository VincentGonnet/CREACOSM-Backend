import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Storage extends Model {
  public id!: number;
  public label!: string;
  public conditions!: object;
}

Storage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conditions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Storage",
    tableName: "storages",
    timestamps: false,
  }
);

export default Storage;
