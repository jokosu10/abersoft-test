const index = async (req, res, next) => {
  await res.status(200).json({
    message: "Hello World!"
  });
};

module.exports = {
  index
}