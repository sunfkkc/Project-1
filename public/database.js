const TODOS_KEY = "todo";

export class Database {
  static load() {
    return JSON.parse(localStorage.getItem(TODOS_KEY)) ?? [];
  }
  static save(todos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }
}
