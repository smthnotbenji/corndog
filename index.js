import { verifyRequest } from "./verify.js";
import { getCommand } from "./commands/register.js";

export default {
  async fetch(request, env) {
    try {
      console.log("REQUEST RECEIVED");

      if (request.method !== "POST") {
        return new Response("Not allowed", { status: 405 });
      }

      const { isValid, body } = await verifyRequest(
        request,
        env.PUBLIC_KEY
      );

      console.log("VERIFY:", isValid);

      if (!isValid) {
        return new Response("Invalid request", { status: 401 });
      }

      const interaction = JSON.parse(body);

      console.log("TYPE:", interaction.type);

      // 🔑 THIS is the most important part
      if (interaction.type === 1) {
        console.log("PING RECEIVED");
        return Response.json({ type: 1 });
      }

      if (interaction.type === 2) {
        const commandName = interaction.data?.name;
        console.log("COMMAND:", commandName);

        const command = getCommand(commandName);

        if (!command) {
          return Response.json({
            type: 4,
            data: { content: "Command not found" }
          });
        }

        return Response.json(await command.execute(interaction, env));
      }

      return new Response("Unhandled interaction");
    } catch (err) {
      console.log("ERROR:", err);
      return new Response("Internal error", { status: 500 });
    }
  }
};
