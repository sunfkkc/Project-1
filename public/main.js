import { Database } from "./database.js";
import * as doc from "./document.js";
import { makeTodoList } from "./insertTodoList.js";
import { getReverseGeocoding } from "./util.js";

let todos = [];
function main() {
  todos = Database.load();
  makeTodoList(todos);
}

main();
