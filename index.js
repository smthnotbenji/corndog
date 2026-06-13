import { verifyRequest } from "./verify.js";
import { getCommand } from "./commands/register.js";

export default {
  async fetch(request, env) {
    try {
      console.log("REQUEST RECEIVED");

      const url = new URL(request.url);

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
