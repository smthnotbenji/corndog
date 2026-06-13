export default {
  name: "echo",

  async execute(interaction) {
    return {
      type: 4,
      data: {
        content: "pong"
      }
    };
  }
};
