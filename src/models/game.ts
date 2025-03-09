import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Ingredient from "./ingredient"; // Import the Ingredient model for association
import GameIngredient from "./game-ingredient";

class Game extends Model {
  public id!: number;
  public groupId!: number;
  public ingredientId!: number[];
}

Game.init(
  {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
    timestamps: false,
    hooks: {
      afterCreate: async (game, options) => {
        try {
          const ingredients = await Ingredient.findAll();

          // Shuffle the ingredients array and pick the first 5
          const shuffled = ingredients.sort(() => 0.5 - Math.random());
          const selectedIngredients = shuffled.slice(0, 5);

          for (const ingredient of selectedIngredients) {
            await GameIngredient.create(
              {
                groupId: game.groupId,
                ingredientId: ingredient.id,
              },
              { transaction: options.transaction } // We need to pass the transaction to the create method, otherwise it will try to create before the commit, breaking the constraints
            );
          }

          console.log(`Added 5 random ingredients to game ${game.groupId}`);
        } catch (error) {
          console.error("Error adding ingredients to game:", error);
        }
      },
    },
  }
);

export default Game;
