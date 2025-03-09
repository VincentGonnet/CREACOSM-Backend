import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Ingredient extends Model {
  public id!: number;
  public label!: string;
  public image!: string;
}

Ingredient.init(
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Ingredient",
    tableName: "ingredients",
    timestamps: false,
  }
);

export default Ingredient;
