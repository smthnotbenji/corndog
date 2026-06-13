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
