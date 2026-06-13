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

async function register() {
  const res = await fetch(
    `https://discord.com/api/v10/applications/1515432846741733416/guilds/${env.GUILD_ID}/commands`,
    {
      method: "PUT",
      headers: {
        "Authorization": `Bot ${env.TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commands)
    }
  );

  const data = await res.json();
  console.log(data);
}

register();
