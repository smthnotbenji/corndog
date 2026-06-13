import echo from "./echo.js";
import meow from "./meow.js";

const commands = new Map([
  [echo.name, echo],
  [meow.name, meow]
]);

export function getCommand(name) {
  return commands.get(name);
}
