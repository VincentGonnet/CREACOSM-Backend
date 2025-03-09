import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Text from "./text"; // Import the Text model for association

class Discovered extends Model {
  public id!: number;
  public groupId!: number;
  public textId!: number[];
}

Discovered.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    textId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Text,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Discovered",
    tableName: "discovereds",
    timestamps: false,
  }
);

export default Discovered;
