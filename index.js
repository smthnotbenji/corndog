import { verifyRequest } from "./verify.js";
import { getCommand } from "./commands/register.js"; // ✅ FIXED

export default {
  async fetch(request, env) {
    try {
      console.log("REQUEST RECEIVED");

      const url = new URL(request.url);

      // ✅ REGISTER ROUTE
      if (url.pathname === "/register") {
        const commands = [
          {
            name: "echo",
            description: "Make corndog say a thing",
            options: [
              {
                name: "text",
                description: "The text",
                type: 3,
                required: true
              }
            ]
          },
          {
            name: "meow",
            description: ":3"
          },
          {
            name: "note",
            description: "Write a note to the T R E E.",
            options: [
              {
                name: "content",
                description: "Content of the note",
                type: 3,
                required: true
              }
            ]
          }
        ];

        const res = await fetch(
          `https://discord.com/api/v10/applications/${env.APP_ID}/guilds/${env.GUILD_ID}/commands`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bot ${env.TOKEN}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(commands)
          }
        );

        return new Response(await res.text());
      }

      // ❌ block non-POST (after /register)
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

      // ✅ Discord ping
      if (interaction.type === 1) {
        return Response.json({ type: 1 });
      }

      // ✅ Command handling
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

        const result = await command.execute(interaction, env);
        console.log("RESULT:", result);

        return Response.json(result);
      }

      return new Response("Unhandled interaction");

    } catch (err) {
      console.log("ERROR:", err);

      // ✅ ALWAYS respond to Discord properly
      return Response.json({
        type: 4,
        data: { content: "Internal error" }
      });
    }
  }
};
