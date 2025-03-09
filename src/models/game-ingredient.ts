import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Game from "./game";
import Ingredient from "./ingredient";
import Text from "./text";
import Discovered from "./discovered";

class GameIngredient extends Model {
  public groupId!: number;
  public ingredientId!: number;
}

GameIngredient.init(
  {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Game,
        key: "groupId",
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
    hooks: {
      afterCreate: async (gameIngredient, options) => {
        try {
          // get all the texts for the ingredient
          const allTexts = await Text.findAll({
            where: {
              idIngredient: gameIngredient.ingredientId,
            },
          });

          // randomly select between 1 and 3 texts
          const randomTexts = allTexts
            .sort(() => 0.5 - Math.random()) // shuffle the array
            .slice(0, Math.floor(Math.random() * 3) + 1); // select between 1 and 3 elements

          // add the selected texts to the discovered table
          for (const text of randomTexts) {
            await Discovered.create(
              {
                groupId: gameIngredient.groupId,
                textId: text.id,
              },
              { transaction: options.transaction }
            );
          }

          console.log(
            `Added ${randomTexts.length} texts to discovered for game ${gameIngredient.groupId}`
          );
        } catch (error) {
          console.error("Error adding text to discovered:", error);
        }
      },
    },
  }
);

export default GameIngredient;
