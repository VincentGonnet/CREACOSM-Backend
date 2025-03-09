import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Game from "./game";
import Ingredient from "./ingredient";

class GameIngredient extends Model {
  public gameId!: number;
  public ingredientId!: number;
}

GameIngredient.init(
  {
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Game,
        key: "id",
      },
      primaryKey: true,
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ingredient,
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "GameIngredient",
    tableName: "game_ingredients",
    timestamps: false,
  }
);

export default GameIngredient;
