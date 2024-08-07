module.exports.userRequestValidator = async (req, res, next) => {
  console.log("Origin", req.get("origin"));
  if (
    process.env.REQUEST_SENDER === req.get("origin") ||
    process.env.REQUEST_SENDER1 === req.get("origin")
  ) {
    next();
  } else {
    res.json({ error: "Resquest is not allowed!" });
  }
};
