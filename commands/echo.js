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
      const get = (name) =>
        interaction.data.options?.find(o => o.name === name)?.value;

      const text = get("text");

      if (!text) {
        return {
          type: 4,
          data: {
            content: "No text provided"
          }
        };
      }

      return {
        type: 4,
        data: {
          content: text
        }
      };
    } catch (err) {
      return {
        type: 4,
        data: {
          content: "Error in say command"
        }
      };
    }
  }
};
