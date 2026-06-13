const commands = [
  {
    name: "echo",
    description: "Make corndog say a thing"
  }
];

async function register() {
  const res = await fetch(
    `https://discord.com/api/v10/applications/${env.APP_ID}/guilds/${env.GUILD_ID}/commands`,
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
