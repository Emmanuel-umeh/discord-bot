module.exports = {
  name: "guildMemberAdd",
  once: false,
  execute(client, member) {
    try {
      member.send(
        `Hello ${member.user.username}, Welcome to Dacade. Lets get you verified. Please type your Dacade email address to get verified`
      );
    } catch (error) {
      console.log("cannot send messages to this user", { error });
    }
  },
};
