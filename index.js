import { verifyRequest } from "./verify.js";
import { getCommand } from "./commands/register.js";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Not allowed", { status: 405 });
    }

    const { isValid, body } = await verifyRequest(
      request,
      env.PUBLIC_KEY
    );

    if (!isValid) {
      return new Response("Invalid request", { status: 401 });
    }

    const interaction = JSON.parse(body);

    if (interaction.type === 1) {
      return Response.json({ type: 1 });
    }

    if (interaction.type === 2) {
      const command = getCommand(interaction.data.name);

      if (!command) {
        return Response.json({
          type: 4,
          data: { content: "Command not found" }
        });
      }

      try {
        return Response.json(
          await command.execute(interaction)
        );
      } catch (err) {
        return Response.json({
          type: 4,
          data: { content: "Couldnt execute command" }
        });
      }
    }

    return new Response("Unhandled interaction");
  }
};
