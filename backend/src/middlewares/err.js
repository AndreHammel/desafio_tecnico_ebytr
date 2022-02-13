module.exports = async (err, _req, res, _next) => {
  if ('code' in err) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};
