const index = (req, res, next) => {
  res.status(200).json({
    message: "Hello World!"
  });
};

module.exports = {
  index
}