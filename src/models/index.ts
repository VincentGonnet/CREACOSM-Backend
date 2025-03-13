import { Sequelize } from "sequelize";
import sequelize from "../config/database";
import Ingredient from "./ingredient";
import Storage from "./storage";
import Text from "./text";
import IngredientStorage from "./ingredient-storage";
import Discovered from "./discovered";
import Game from "./game";
import GameIngredient from "./game-ingredient";
import Condition from "./condition";

interface DbInterface {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  Ingredient: typeof Ingredient;
  Storage: typeof Storage;
  Text: typeof Text;
  IngredientStorage: typeof IngredientStorage;
  Discovered: typeof Discovered;
  Game: typeof Game;
  GameIngredient: typeof GameIngredient;
  Condition: typeof Condition;
}

const db: DbInterface = {
  Sequelize,
  sequelize,
  Ingredient,
  Storage,
  Text,
  IngredientStorage,
  Discovered,
  Game,
  GameIngredient,
  Condition,
};

Ingredient.hasMany(Text, { foreignKey: "idIngredient" });
Text.belongsTo(Ingredient, { foreignKey: "idIngredient" });

Ingredient.hasMany(IngredientStorage, { foreignKey: "idIngredient" });
IngredientStorage.belongsTo(Ingredient, { foreignKey: "idIngredient" });

IngredientStorage.belongsTo(Condition, { foreignKey: "condition" });
Condition.hasMany(IngredientStorage, { foreignKey: "condition" });

Game.belongsToMany(Ingredient, {
  through: GameIngredient,
  foreignKey: "groupId",
});
Ingredient.belongsToMany(Game, {
  through: GameIngredient,
  foreignKey: "ingredientId",
});

Discovered.belongsTo(Text, { foreignKey: "textId" });
Text.hasMany(Discovered, { foreignKey: "textId" });

export default db;
