const hello = (req, res, next) => {
  res.status(200).json({
    message: "Hello World!"
  });
};

const ping = (req, res, next) => {
  // Create a new Date object
  const currentDateTime = new Date();

  // Convert the date to a string
  const formattedDateTime = currentDateTime.toString();

  res.status(200).json({
    message: "PONG!!",
    time: formattedDateTime
  });
};

module.exports = {
  ping,
  hello
}