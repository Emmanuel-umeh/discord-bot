function checkStringForEmail(text) {
  const email = text.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  );
  if (!email) return null;

  return email[0];
}

module.exports = {
  checkStringForEmail,
};
