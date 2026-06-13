export default {
  name: "meow",
  description: ":3",
  async execute(interaction, env) {
    return {
      type: 4,
      data: {
        content: `Meow`
      }
    };
  }
};
