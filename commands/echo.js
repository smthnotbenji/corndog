export default {
  name: "echo",
  description: "Make corndog say a thing",

  options: [
    {
      name: "text",
      description: "The text",
      type: 3,
      required: true
    }
  ],

  async execute(interaction, env) {
    try {
      const options = interaction.data?.options || [];
      const text = options.find(o => o.name === "text")?.value;

      return {
        type: 4,
        data: {
          content: text || "No text provided"
        }
      };
    } catch (err) {
      return {
        type: 4,
        data: {
          content: "Error in echo command"
        }
      };
    }
  }
};
