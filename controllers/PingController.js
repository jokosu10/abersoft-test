const hello = (req, res, next) => {
  res.status(200).json({
    message: "Hello World!"
  });
};

const ping = (req, res, next) => {

  const currentDateTime = new Date();

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
