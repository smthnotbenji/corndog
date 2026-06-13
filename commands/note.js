export default {
  name: "note",
  description: "Send a note to the T R E E",

  options: [
    {
      name: "content",
      description: "Content of the note",
      type: 3,
      required: true
    }
  ],

  async execute(interaction, env) {
    const options = interaction.data?.options || [];
    const text = options.find(o => o.name === "text")?.value;

    const CHANNEL_ID = "PUT_CHANNEL_ID_HERE";

    try {
      // 🔥 Send message to channel
      await fetch(
        `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bot ${env.TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: text
          })
        }
      );

      // ✅ Respond to user
      return {
        type: 4,
        data: {
          content: "Note sent"
        }
      };

    } catch (err) {
      return {
        type: 4,
        data: {
          content: "Failed to send message"
        }
      };
    }
  }
};
