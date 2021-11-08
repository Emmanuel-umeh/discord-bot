const { default: axios } = require("axios");

const url = process.env.SEARCH_BY_MAIL_ENDPOINT;

const checkStringForEmail = (text) => {
  const email = text.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  );
  if (!email) return null;

  return email[0];
};

const fetchUsernameByEmail = async (email) => {
  try {
    const result = await axios.get(`${url}${email}`);
    const { displayName } = result.data;
    return displayName;
  } catch (error) {
    console.log({ error });
  }
};

module.exports = {
  checkStringForEmail,
  fetchUsernameByEmail,
};
