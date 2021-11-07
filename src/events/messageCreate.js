const { GUILD_ID, GENERAL_CHANNEL_ID } = require("../guild/constants");
const { VERIFIED_ROLE } = require("../roles");
const { checkStringForEmail } = require("../utils/helper");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(client, message) {
    const { channel, content, author } = message;
    if (author.bot) return;
    switch (channel.type) {
      case "DM":
        const targetGuild = await client.guilds.fetch(GUILD_ID);

        let owner;
        try {
          owner = await targetGuild.members.fetch(author.id);
        } catch (error) {
          message.reply("Kindly join the Dacade server.");
          return;
        }

        const { _roles } = owner;

        if (_roles.indexOf(VERIFIED_ROLE) > -1) {
          console.log("this user has already been verified");
          message.reply(
            "You have already been verified. My purpose has been accomplished."
          );
          return;
        }

        const email = checkStringForEmail(content);
        if (!email) {
          message.reply("Please enter a valid email");
          return;
        }

        owner.roles.add(VERIFIED_ROLE);
        message.reply(
          "Thanks for entering your email. You have been verified successfully"
        );

        const nickame = "Legend";
        await owner.setNickname(nickame);

        client.channels.cache
          .get(GENERAL_CHANNEL_ID)
          .send(`Welcome ${author.toString()} to this server`);
        break;

      case "GUILD_TEXT":
        console.log("this is a guild chat message");

        break;

      default:
        break;
    }
  },
};
