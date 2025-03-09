import { Sequelize } from "sequelize";
import sequelize from "../config/database";
import Ingredient from "./ingredient";
import Storage from "./storage";
import Text from "./text";
import IngredientStorage from "./ingredient-storage";
import Discovered from "./discovered";
import Game from "./game";
import GameIngredient from "./game-ingredient";

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
};

export default db;
