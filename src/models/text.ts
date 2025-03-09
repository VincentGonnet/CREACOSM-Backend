import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Ingredient from "./ingredient"; // Import the Ingredient model for association

class Text extends Model {
  public id!: number;
  public idIngredient!: number;
  public condition!: string;
  public lowerBound!: number;
  public upperBound!: number;
  public message!: string;
}

Text.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idIngredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ingredient,
        key: "id",
      },
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lowerBound: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    upperBound: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Text",
    tableName: "texts",
    timestamps: false,
  }
);

export default Text;
