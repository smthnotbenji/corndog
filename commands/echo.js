export default {
  name: "echo",
 description: 
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
