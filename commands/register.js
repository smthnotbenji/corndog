import echo from "./echo.js";
import meow from "./meow.js";
import note from "./note.js";

const commands = new Map([
  [echo.name, echo],
  [meow.name, meow],
  [note.name, note]
]);

export function getCommand(name) {
  return commands.get(name);
}
