import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Ingredient from "./ingredient"; // Import the Ingredient model for association

class Game extends Model {
  public id!: number;
  public groupId!: number;
  public ingredientId!: number[];
}

Game.init(
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
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
    timestamps: false,
  }
);

export default Game;
