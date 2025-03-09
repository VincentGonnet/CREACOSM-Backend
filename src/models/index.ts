import { Sequelize } from "sequelize";
import sequelize from "../config/database";
import Ingredient from "./ingredient";
import Storage from "./storage";
import Text from "./text";
import IngredientStorage from "./ingredient-storage";
import Discovered from "./discovered";

const db: { [key: string]: any } = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Ingredient = Ingredient;
db.Storage = Storage;
db.Text = Text;
db.IngredientStorage = IngredientStorage;
db.Discovered = Discovered;

export default db;
