import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Condition extends Model {
  public label!: string;
  public unit!: string;
}

Condition.init(
  {
    label: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Condition",
    tableName: "conditions",
    timestamps: false,
  }
);

export default Condition;
