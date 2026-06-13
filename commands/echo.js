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
          
  async execute(interaction) {
    const options = interaction.data.options;

    const text = options.find(opt => opt.name === "text").value;

    return {
      type: 4,
      data: {
        content: text
      }
    };
  }
};
