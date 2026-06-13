import echo from "./echo.js";

const commands = new Map([
  [echo.name, echo],
]);

export function getCommand(name) {
  return commands.get(name);
}
