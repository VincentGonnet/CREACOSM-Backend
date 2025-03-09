import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Ingredient from "./ingredient"; // Import the Ingredient model for association

class IngredientStorage extends Model {
  public idIngredient!: number;
  public condition!: string;
  public lowerBound!: number;
  public upperBound!: number;
}

IngredientStorage.init(
  {
    idIngredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ingredient,
        key: "id",
      },
      primaryKey: true,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    lowerBound: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    upperBound: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "IngredientStorage",
    tableName: "ingredient_storages",
    timestamps: false,
  }
);

export default IngredientStorage;
